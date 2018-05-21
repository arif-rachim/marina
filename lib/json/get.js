const database = require('./database.js');

module.exports = (req,res) => {
    const resource = req.params.resource;
    const id = req.params.id;
    let db = database[resource];
    if(id){
        db.findOne({_id:id},(err,doc) => {
            res.end(JSON.stringify(doc));
        });
    }else{
        // we need to introduce pagination here
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 50;


        // Count all documents in the datastore
        db.count({}, function (err, count) {
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
                res.end(JSON.stringify(result));
            });
        });
        
    }
    
};