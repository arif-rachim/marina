const {fetch} = require('../../../config');
module.exports = async (req,res) => {
    const resource = req.params.resource;
    const resources = await fetch(`/res/${resource}?$l=1000000`);
    const schema = resources.docs.reduce((result,res)=>{
        for (var key in res) {
            if (res.hasOwnProperty(key)) {
                result[key] = result[key] || {};
                result[key].type = typeof res[key];
                if(result[key].type === 'object' && Array.isArray(res[key])){
                    result[key].type = 'array';
                }
                result[key].name = key;
            }
        }
        return result;
    },{});
    const result = [];
    for (var key in schema) {
        if (schema.hasOwnProperty(key)) {
            result.push(schema[key]);
        }
    }
    res.end(JSON.stringify(result));
};