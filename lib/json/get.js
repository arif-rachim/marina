const database = require('../database.js');

module.exports = (req,res) => {
    const resource = req.params.resource;
    let db = database[resource];
    db.find('type' in req.query ? {type:req.query.type} : {},(err,docs) => {
        res.end(JSON.stringify(docs));
    });
};