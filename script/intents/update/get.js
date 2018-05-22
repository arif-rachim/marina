const database = require('./../json/database');
const template = require('./get-template');
const {load} = require('./../design/service');

module.exports = (req,res) => {
    const resource = req.params.resource;
    const id = req.params.id;
    
    
    let {err,data} = load(resource);
    if(err){
        console.log(`${resource} design is not available`);
        res.end(`Unable to load form ${resource}`);
        return;
    }
    
    let db = database[resource];
    db.findOne({_id:id},(err,doc) => {
        if(err){
            console.log(`${resource} record is not available`);
            res.end(`Unable to load record ${resource} ID ${id}`);
            return;
        }
        res.end(template(resource,doc,data));
    });
};