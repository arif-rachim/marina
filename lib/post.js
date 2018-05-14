const database = require('./database.js');
const post = (req,res) => {
    const doc = req.body;
    const resource = req.params.resource;
    database[resource].insert(doc,(err,newDoc) => {
        if(err){
            res.end(JSON.stringify(err,null,2));
        }else{
            res.end(JSON.stringify(newDoc,null,2));
        }
    });
};

module.exports = post;