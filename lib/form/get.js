const yaml = require('js-yaml');
const yamlDirectory = `.resources/design`;
const fs = require('fs');
const template = require('./get-template.js');

module.exports = (req,res) => {
    const resource = req.params.resource;
    try{
        const design = yaml.safeLoad(fs.readFileSync(`${yamlDirectory}/${resource}.yaml`,'utf-8'));
        res.end(template(design));
    }catch (err) {
        console.log(`${resource} design is not available`);
        res.end(`Unable to load form ${resource}`);
    }
};