
const express = require("express");
const bodyParser = require("body-parser");
const api = require("./lib/api.js");
const app = express();
const PORT = 9000;

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/v1/:resource', (req,res) => {
    api.post(req,res);
});

app.get('/v1/:resource', (req,res) => {
    if('_mode' in req.query){
        let mode = req.query._mode;
        switch (mode){
            case 'design':
                api.design(req,res);
                break;
            case 'create' :
                api.create(req,res);
                break;
        }
    } else{
        api.get(req,res);
    }
});

app.listen(PORT);
console.log(`Server run at ${PORT}`);