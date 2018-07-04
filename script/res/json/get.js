const database = require('./database');
const middleware = require('./middleware');

const defaultBeforeRequest = (req,data,next,cancel) => {
    next(data);
};

const defaultAfterRequest = (req,data,res,cancel) => {
    res.end(JSON.stringify(data));
};

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
        if(!database.isExist(resource)){
            res.end(JSON.stringify({
                docs:[],
                success : false,
                message : `${resource} does not exist`
            }));
            return;
        }


        let db = database[resource];
        
        if(id){
            findById(id,db).then(data => {
                res.end(JSON.stringify(data));

                // let beforeRequest = middleware.isExist(resource,'beforeRequest',data._form_version) ? middleware.load(resource,'beforeRequest',data._form_version) : defaultBeforeRequest;
                // let afterRequest = middleware.isExist(resource,'afterRequest',data._form_version) ? middleware.load(resource,'afterRequest',data._form_version) : defaultAfterRequest;
                //
                // return new Promise((resolve,reject) => {
                //     beforeRequest(req,data,resolve,reject);
                // }).then(doc => {
                //     return new Promise((resolve,reject) => {
                //         db.update({_id:id},{$set : doc},{},(err,newDoc) => {
                //             if(err){
                //                 reject({success:false,message:err.message});
                //             }else{
                //                 resolve({success:true,data:newDoc});
                //             }
                //         });
                //     });
                // }).then(result => {
                //     return new Promise((resolve,reject) => {
                //         afterRequest(req,result,res,reject)
                //     });
                // }).catch(err => {
                //     console.error(err);
                //     res.end(JSON.stringify({success:false,message:err.message}));
                // });


            });







        } else if(ids) {
            Promise.all(ids.split(',').map(id => findById(id,db))).then(results => {
                res.end(JSON.stringify(results));
            });
        }else{
            // we need to introduce pagination here
            const skip = parseInt(req.query.$i) || 0;
            const limit = parseInt(req.query.$l) || 50;
            const isAnd = parseInt(req.query.$and) || 0;
            const propertiesToDelete = ["$i","$l","$and"];
            const query = req.query;
            let sort = {};
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
                    if(value.length > 2 && value.charAt(0) === '|' && value.charAt(value.length - 1) === '|'){
                        condition[prop] = value.substring(1,value.length-1);
                    }else{
                        condition[prop] = new RegExp(value,'i');
                    }
                    queries.push(condition);
                }
            }

            let queryObject = queries.length > 0 ? ( isAnd > 0 ?  {$and : queries} : {$or : queries} )   : {};
            db.count(queryObject, function (err, count) {
                let executionPlan = db.find(queryObject).sort(sort).skip(skip).limit(limit);
                if(projections.length > 0){
                    const projection = projections.reduce((result,projection,index) => {
                        result[projection.name] = projection.value;
                        return result;
                    },{});
                    executionPlan = executionPlan.projection(projection);
                }
                executionPlan.exec((err, docs) => {
                    let result = {
                        success : true,
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
        err.success = false;
        console.error(err);
        res.end(JSON.stringify(err));
    }

    
};