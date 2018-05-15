
const express = require("express");
const bodyParser = require("body-parser");
const api = require("./lib/api.js");
const app = express();
const home = require("./home.js");
const PORT = 8000;

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/v1/:resource', (req,res) => {
    if('_mode' in req.query){
        let mode = req.query._mode;
        switch (mode){
            case 'design':
                api.postDesign(req,res);
                break;
            default :
                console.error(`Warning no implementation for POST method with mode ${mode}`);
                break;
        }
    } else{
        api.post(req,res);
    }
});

app.get('/v1/:resource', (req,res) => {
    if('_mode' in req.query){
        let mode = req.query._mode;
        switch (mode){
            case 'design':
                api.getDesign(req,res);
                break;
            case 'form':
                api.getForm(req,res);
                break;
            default :
                console.error(`Warning no implementation for GET method with mode ${mode}`);
                break;
        }
    } else{
        api.get(req,res);
    }
});

app.get('/home',home);

app.listen(PORT);
console.log(`Server run at ${PORT}`);