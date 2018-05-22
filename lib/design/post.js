
const {save} = require('./service');
module.exports = (req,res) => {
    const resource = req.params.resource;
    if(req.body.createdOn && req.body.createdOn.length > 0){
        req.body.lastUpdateOn = new Date().toISOString();
    }else{
        req.body.createdOn = new Date().toISOString();
    }
    save(req.body,resource);

};