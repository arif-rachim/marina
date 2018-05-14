const yaml = require('js-yaml');
const fs = require('fs');
const mkdir = require('./mkdir.js');
const resourceDesigner = require('./template/resource-designer.js');
const RESOURCE_DIR = `${__dirname}/../.resources/`;

module.exports = (req,res) => {
    const resource = req.params.resource;
    let yamlDirectory = `${RESOURCE_DIR}/design`;
    mkdir(yamlDirectory);
    try{
        const design = yaml.safeLoad(fs.readFileSync(`${yamlDirectory}/${resource}.yaml`,'utf-8'));
        res.end(resourceDesigner(design));
    }catch (err) {
        console.log(`${resource} design is not available`);
    }
    res.end(resourceDesigner({resource:resource}));
};
