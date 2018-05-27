#!/usr/bin/env nodejs

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const index = require("./script/templates/index");
const accessDenied = require("./script/templates/access-denied");
const components = require("./script/webcomponents/index");
const {intentsPath,svcPath,pagePath,applicationPort,fetch} = require("./config");
const PORT = applicationPort;

app.use(cookieParser());
app.use((req, res, next) => {
  let cookie = req.cookies.sessionId;
  if (cookie === undefined){
    let cookie= guid();
    res.cookie('sessionId',cookie, { maxAge: 900000, httpOnly: true });
  } 
  next();
});

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/v1/:resource', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/post`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
        console.error(err);
    }
});

app.get('/v1/:resource', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/get`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});

app.get('/v1/:resource/:id', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/get`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
        console.error(err);
    }
});


app.delete('/v1/:resource/:id', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/delete`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
        console.error(err);
    }
});

app.put('/v1/:resource/:id', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/put`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});

app.post('/svc/:service', (req,res) => {
    try{
        const svc = req.params.service.split(".").join("/");
        require(`${svcPath}/${svc}`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
        console.error(err);
    }
});

app.get('/svc/:service', (req,res) => {
    try{
        const svc = req.params.service.split(".").join("/");
        require(`${svcPath}/${svc}`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
        console.error(err);
    }
});

app.get('/page/:page',async (req,res) => {
    try{
        const sessionId = req.cookies.sessionId || req.query.sessionId;
        const result = await fetch(`v1/users?sessionId=${sessionId}`);
        if(result.docs && result.docs.length == 0){
            accessDenied(req,res);
            return;
        }        
        req.context = {currentUser:result[0]};
        const pp = req.params.page.split(".").join("/");
        require(`${pagePath}/${pp}`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
        console.error(err);
    }
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

app.get('/comps/:component',components);
app.get('/index.html',index);


app.listen(PORT);
console.log(`Server run at ${PORT}`);