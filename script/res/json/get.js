const database = require('./database');

const findById = (id,db) => {
    return new Promise(resolve => {
        db.findOne({_id:id.trim()},(err,doc) => {
            resolve(doc);
        });
    });
};

module.exports = (req,res) => {
    try{
        const resource = req.params.resource;
        const id = req.params.id;
        const ids = req.query.$ids;
        let db = database[resource];
        
        if(id){
            findById(id,db).then(data => {
                res.end(JSON.stringify(data));
            });
        } else if(ids) {
            Promise.all(ids.split(',').map(id => findById(id,db))).then(results => {
                res.end(JSON.stringify(results));
            });
        }else{
            // we need to introduce pagination here
            const skip = parseInt(req.query.$i) || 0;
            const limit = parseInt(req.query.$l) || 50;
            const propertiesToDelete = ["$i","$l"];
            const query = req.query;
            let sort = { _createdOn : 1 };
            let projections = [];
            for (var property in query) {
                if (query.hasOwnProperty(property)) {
                    if(property.indexOf("$s.") == 0){
                        const propName = property.substring("$s.".length,property.length);
                        sort[propName] = query[property];
                        if(!isNaN(parseFloat(sort[propName]))) {
                            sort[propName] = parseFloat(sort[propName]);
                        }
                        propertiesToDelete.push(property);
                    }
                    if(property.indexOf("$p.") == 0){
                        const propName = property.substring("$p.".length,property.length);
                        let propVal = query[property];
                        if(!isNaN(parseFloat(propVal))) {
                            propVal = parseFloat(propVal);
                        }
                        projections.push({name : propName, value : propVal});
                        propertiesToDelete.push(property);
                    }
                }
            }
            propertiesToDelete.forEach(prop => {
                delete query[prop]
            });
            const queries = [];
            for (const prop in query) {
                if (query.hasOwnProperty(prop)) {
                    const condition = {};
                    let value = query[prop];
                    condition[prop] = new RegExp(value,'i');
                    queries.push(condition);
                }
            }
            let orQueries = queries.length > 0 ?{$or : queries} : {};
            db.count(orQueries, function (err, count) {
                let executionPlan = db.find(orQueries).sort(sort).skip(skip).limit(limit);
                if(projections.length > 0){
                    const projection = projections.reduce((result,projection,index) => {
                        result[projection.name] = projection.value;
                        return result;
                    },{});
                    executionPlan = executionPlan.projection(projection);
                }
                executionPlan.exec((err, docs) => {
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
    }catch(err){
        console.error(err);
        res.end(JSON.stringify({errorMessage:err.message}));
    }

    
};