const database = require('./database');

module.exports = (req,res) => {
    try{
        const resource = req.params.resource;
        const id = req.params.id;
        let db = database[resource];
        
        if(id){
            db.findOne({_id:id},(err,doc) => {
                res.end(JSON.stringify(doc));
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
            })
            db.count(query, function (err, count) {
                let executionPlan = db.find(query).sort(sort).skip(skip).limit(limit);
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