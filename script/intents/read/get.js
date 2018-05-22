const template = require('./get-template');
const {load} = require('./../design/service');
const database = require('./../json/database');

module.exports = (req,res) => {
    const resource = req.params.resource;
    const {err,data} = load(resource);
    const resourceDesign = data;
    if(err){
        console.log(`${resource} design is not available`);
        res.end(`Unable to load form ${resource}`);
        return;
    }
    console.log(`Ok we got resourceDesign ${JSON.stringify(resourceDesign)}`);
    const displayRaw = req.query.raw || false;
    let db = database[resource];
    
    
    
    // we need to introduce pagination here
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 50;

    // Count all documents in the datastore
    db.count({}, (err, count) => {
        db.find({}).sort({ _createdOn : 1 }).skip(skip).limit(limit).exec((err, docs) => {
            let result = {
                pageInfo : {
                    totalRecords: count,
                    startingIndex: skip,
                    limit : limit,
                    currentPage : (Math.floor(skip / limit) + 1),
                    totalPage : (Math.floor(count / limit) + 1)
                },
                docs : docs
            }
            if(err){
                console.log(`${resource} database is not available`);
                res.end(`Unable to load data ${resource}`);
                return;            
            }
            res.end(template(resource,resourceDesign,result.docs,displayRaw,result.pageInfo));
        });
    });
    
    
};