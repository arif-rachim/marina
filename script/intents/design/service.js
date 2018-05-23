const yaml = require('js-yaml');

const yamlDirectory = `${__dirname}/../../../.resources/design`;
const fs = require('fs');
const mkdir = require('./../mkdir');

const load = (resource) => {
    mkdir(yamlDirectory);
    try{
        const data = yaml.safeLoad(fs.readFileSync(`${yamlDirectory}/${resource}.yaml`,'utf-8'));
        return {data,err:false};
    }catch (err) {
        console.error(err);
        return {data:false,err};
    }
};

const save = (data,resource) => {
    mkdir(yamlDirectory);
    try{
        let design = yaml.safeDump(data, {sortKeys:false});
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
}

module.exports = {load,save};