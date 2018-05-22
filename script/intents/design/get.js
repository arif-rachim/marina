const template = require('./get-template');
const {load} = require('./service');


module.exports = (req,res) => {
    const resource = req.params.resource;
    const {err,data} = load(resource);
    if(err){
        res.end(template({resource}));
        return;
    }
    res.end(template(data));

};
