const database = require('./database');

module.exports = (req,res) => {
    const doc = req.body;
    doc._createdOn = new Date().getTime();
    const resource = req.params.resource;
    // first we need to get the yaml file and check if theres any validation here
    console.log("Storing document ",doc);
    
    database[resource].insert(doc,(err,newDoc) => {
        if(err){
            res.end(JSON.stringify(err,null,2));
        }else{
            res.end(JSON.stringify(newDoc,null,2));
        }
    });
};