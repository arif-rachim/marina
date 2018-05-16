const template = require('./get-template.js');
const {load} = require('./service.js');


module.exports = (req,res) => {
    const resource = req.params.resource;
    const {err,data} = load(resource);
    if(err){
        res.end(template({resource}));
        return;
    }
    res.end(template(data));

};
