const yaml = require('js-yaml');
const RESOURCE_DIR = `${__dirname}/../.resources/`;
const fs = require('fs');
const mkdir = require('./mkdir.js');

module.exports = (req,res) => {
    const resource = req.params.resource;
    let yamlDirectory = `${RESOURCE_DIR}/design`;
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