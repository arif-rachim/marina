const yaml = require('js-yaml');
const yamlDirectory = `${__dirname}/../../.resources/design`;
const fs = require('fs');
const mkdir = require('../mkdir.js');
const template = require('./get-template.js');


module.exports = (req,res) => {
    const resource = req.params.resource;
    mkdir(yamlDirectory);
    try{
        const data = yaml.safeLoad(fs.readFileSync(`${yamlDirectory}/${resource}.yaml`,'utf-8'));
        res.end(template(data));
    }catch (err) {
        console.log(`${resource} design is not available`);
        res.end(template({resource:resource}));
    }
};
