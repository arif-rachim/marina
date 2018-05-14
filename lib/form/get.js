const yaml = require('js-yaml');
const yamlDirectory = `${__dirname}/../../.resources/design`;
const fs = require('fs');

module.exports = (req,res) => {
    const resource = req.params.resource;
    try{
        const design = yaml.safeLoad(fs.readFileSync(`${yamlDirectory}/${resource}.yaml`,'utf-8'));
        res.end(JSON.stringify(design));
    }catch (err) {
        console.log(`${resource} design is not available`);
    }
    res.end('this form get');
};