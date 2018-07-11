#!/usr/bin/env nodejs
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const cheerio = require("cheerio");
const accessDenied = require("./script/page/access-denied");
const underConstruction = require("./script/page/under-construction");
const {guid} = require("./script/common/utils");
const {intentsPath,svcPath,pagePath,applicationPort,fetch,securePageAccess,invalidateModuleCache} = require("./config");
const PORT = applicationPort;

const path = require('path');

const appRoot = path.resolve(__dirname);


app.use(cookieParser());
app.use((req, res, next) => {
  let cookie = req.cookies.sessionId;
  if (cookie === undefined){
    let cookie= guid();
    res.cookie('sessionId',cookie, { maxAge: 604800000, httpOnly: true });
  } 
  next();
});

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/res/:resource', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/post`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify({success:false,message:err.message}));
        console.error(err);
    }
});


app.get('/res/:resource', async (req,res) => {
    let mode = req.query.intent || 'json';
    const resource = req.params.resource;
    try{
        const modulePath = `${intentsPath}/${mode}/get`;
        const template = require(modulePath);
        if(mode.endsWith('-html')){
            const templateResult = await processRequest(req,template);
            res.end(templateResult);
            if(invalidateModuleCache){
                delete require.cache[require.resolve(modulePath)];
            }
        }else{
            template.call(null,req,res);
        }
    }catch(err){
        res.end(JSON.stringify({success:false,message:err.message}));
        console.error(err);
    }
});

app.get('/res/:resource/:id',async (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        const modulePath = `${intentsPath}/${mode}/get`;
        const template = require(modulePath);
        if(mode.endsWith('-html')){
            const templateResult = await processRequest(req,template);
            res.end(templateResult);
            if(invalidateModuleCache){
                delete require.cache[require.resolve(modulePath)];
            }
        }else{
            template.call(null,req,res);
        }
    }catch(err){
        res.end(JSON.stringify({success:false,message:err.message}));
        console.error(err);
    }

});


app.delete('/res/:resource/:id', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/delete`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify({success:false,message:err.message}));
        console.error(err);
    }
});

app.put('/res/:resource/:id', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/put`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify({success:false,message:err.message}));
        console.error(err);
    }
});

app.post('/svc/:service', (req,res) => {
    try{
        const svc = req.params.service.split(".").join("/");
        require(`${svcPath}/${svc}`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify({success:false,message:err.message}));
        console.error(err);
    }
});

app.get('/svc/:service', (req,res) => {
    try{
        const svc = req.params.service.split(".").join("/");
        require(`${svcPath}/${svc}`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify({success:false,message:err.message}));
        console.error(err);
    }
});

const isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

app.get('/page/:page',async (req,res) => {
    try{
        const sessionId = req.cookies.sessionId || req.query.sessionId;
        const result = await fetch(`/res/system_active_sessions?sessionId=${sessionId}`);
        /**
         * For time being lets comment this code

            const isPrivateAccess = !req.params.page.endsWith("-public");
            if(result.docs && result.docs.length == 0 && securePageAccess && isPrivateAccess){
                const templateResult = await processRequest(req,accessDenied);
                res.end(templateResult);
                return;
            }

         */
        const pp = req.params.page.split(".").join("/");
        const modulePath = `${pagePath}/${pp}`;
        const template = require(modulePath);
        const templateResult = await processRequest(req,(req) => `<div>${req.print(template(req))}</div>`);
        res.end(templateResult);
        if(invalidateModuleCache){
            delete require.cache[require.resolve(modulePath)];
            console.log(`Invalidate cache ${modulePath} because its a PAGE`);
        }
    }catch(err){
        const templateResult = await processRequest(req,underConstruction);
        res.end(templateResult);
        console.error(err);
    }

});

function processRequest(req,template){
    return parseTemplate(req,template).then(result => {
        const $ = cheerio.load(result);
        const promises = [];
        $('script[path]').each((index,element) => {
            const script = $(element).html();
            const path = $(element).attr('path');
            $(element).removeAttr('path');
            const elementId = guid();
            $(element).attr('data-id',elementId);
            const modulePath = path.replace(appRoot,'.').replace('.js','').replace(/\\/g,'/');
            promises.push(fetch(`/svc/system.esnext-es5`,{
                script,
                path : modulePath
            },'POST').then(result => {
                return {
                    data: result.code,
                    elementId
                }
            }));
        });
        if(promises.length > 0){
            return Promise.all(promises).then(dataPaths => {
                try{
                    dataPaths.forEach(({data,elementId}) => {
                        $('script[data-id="'+elementId+'"]').text(data);
                    })
                }catch(err){
                    console.error(err);
                }
                return Promise.resolve($.html());
            });
        }
        return Promise.resolve(result);
    })

}

function parseTemplate(req,template) {
    return new Promise(resolve => {
        req.updateTemplate = (id, template) => {
            if(req.template.indexOf(id)>=0){
                req.template = req.template.replace(id, template);
            }else{
                setTimeout(req.updateTemplate,10,id,template);
                return;
            }
            if (req.template.indexOf('<!-- ASYNCID:') < 0) {
                resolve(req.template);
            }
        };

        req.print = (callback) => {
            const uuid = `<!-- ASYNCID:${guid()} -->`;
            if (callback instanceof Promise) {
                callback.then(template => {
                    req.updateTemplate(uuid, template);
                });
            } else if (isFunction(callback)) {
                new Promise(callback).then(template => {
                    req.updateTemplate(uuid, template);
                });
            } else if (typeof callback === 'string') {
                new Promise((resolve) => {
                    setTimeout(() => resolve(callback), 10);
                }).then(template => {
                    req.updateTemplate(uuid, template);
                });
            }
            return uuid;
        };
        req.template = req.print(template(req));
    });
}

app.get('/app.html',async (req,res) => {
    try{
        const index = require("./script/page/app");
        const templateResult = await processRequest(req, index);
        res.end(templateResult);
    }catch(err){
        res.end(JSON.stringify({success:false,message:err.message}));
        console.error(err);
    }
});


app.listen(PORT);
console.log(`Server run at ${PORT}`);