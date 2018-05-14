const yaml = require('js-yaml');
const yamlDirectory = `${__dirname}/../../.resources/design`;
const fs = require('fs');
const mkdir = require('../mkdir.js');

module.exports = (req,res) => {
    const resource = req.params.resource;
    mkdir(yamlDirectory);
    try{
        if(req.body.createdOn){
            req.body.lastUpdateOn = new Date().toISOString();
        }else{
            req.body.createdOn = new Date().toISOString();
        }
        let design = yaml.safeDump(req.body, {sortKeys:false});
        fs.writeFile(`${yamlDirectory}/${resource}.yaml`,design,'utf-8',err => {
            if(err){
                console.error(err);
            }else{
                console.log(`${resource}.yaml saved succefully`);
            }
        });

    }catch (err) {
        console.error(err);
    }
};