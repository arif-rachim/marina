
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const home = require("./home.js");
const PORT = 8000;

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/v1/:resource', (req,res) => {
    let mode = req.query._mode || 'json';
    try{
        require(`./lib/${mode}/post.js`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});

app.get('/v1/:resource', (req,res) => {
    let mode = req.query._mode || 'json';
    try{
        require(`./lib/${mode}/get.js`).call(null,req,res);
    }catch(err){
        res.end(JSON.stringify(err));
    }
});

app.get('/',home);

app.listen(PORT);
console.log(`Server run at ${PORT}`);