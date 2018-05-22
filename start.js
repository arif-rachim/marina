#!/usr/bin/env nodejs

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const index = require("./script/templates/index");
const PORT = process.env.SERVER_PORT || 8000;
const intentsPath = './script/intents';
const svcPath = './script/svc';

app.use(cookieParser());
app.use(function (req, res, next) {
  let cookie = req.cookies.sessionId;
  if (cookie === undefined)
  {
    let cookie= guid();
    res.cookie('sessionId',cookie, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  }else{
    console.log('cookie exists', cookie);
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
        console.log("GET get called");
        require(`${intentsPath}/${mode}/get`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});


app.delete('/v1/:resource/:id', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        require(`${intentsPath}/${mode}/delete`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});

app.put('/v1/:resource/:id', (req,res) => {
    let mode = req.query.intent || 'json';
    try{
        console.log("PUT get called "+mode);
        require(`${intentsPath}/${mode}/put`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});

app.post('/svc/:service', (req,res) => {
    try{
        const svc = req.params.service.split(".").join("/");
        console.log("Post get called "+svc);
        require(`${svcPath}/${svc}`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});

app.get('/svc/:service', (req,res) => {
    try{
        const svc = req.params.service.split(".").join("/");
        console.log("Post get called "+svc);
        require(`${svcPath}/${svc}`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

app.get('/index.html',index);

app.listen(PORT);
console.log(`Server run at ${PORT}`);