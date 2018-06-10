const database = require('./database');

module.exports = (req,res) => {
    const doc = req.body;
    doc._createdOn = new Date().getTime();
    const resource = req.params.resource;
    database[resource].insert(doc,(err,newDoc) => {
        if(err){
            res.end(JSON.stringify({errorMessage:err.message}));
        }else{
            res.end(JSON.stringify(newDoc,null,2));
        }
    });
};