const template = require('./get-template.js');
const {load} = require('./../design/service.js');
const database = require('./../json/database.js');

module.exports = (req,res) => {
    const resource = req.params.resource;
    const {err,data} = load(resource);
    const resourceDesign = data;
    if(err){
        console.log(`${resource} design is not available`);
        res.end(`Unable to load form ${resource}`);
        return;
    }
    console.log(`Ok we got resourceDesign ${JSON.stringify(resourceDesign)}`);
    const displayRaw = req.query.raw || false;
    let db = database[resource];
    db.find({},(err,datas) => {
        if(err){
            console.log(`${resource} database is not available`);
            res.end(`Unable to load data ${resource}`);
            return;            
        }
        res.end(template(resource,resourceDesign,datas,displayRaw));
    });
};