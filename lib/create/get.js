const template = require('./get-template');
const {load} = require('./../design/service');

module.exports = (req,res) => {
    const resource = req.params.resource;
    let {err,data} = load(resource);
    if(err){
        console.log(`${resource} design is not available`);
        res.end(`Unable to load form ${resource}`);
        return;
    }
    res.end(template(data));

};