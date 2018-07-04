const database = require('./database');
const middleware = require('./middleware');

const defaultBeforeRequest = (req,data,next,cancel) => {
    next(data);
};

const defaultAfterRequest = (req,data,res,cancel) => {
    res.end(JSON.stringify(data));
};

module.exports = (req,res) => {
    try{
        const doc = req.body;
        doc._lastUpdatedOn = new Date().getTime();
        const resource = req.params.resource;
        const db = database[resource];
        const id = req.params.id;
        delete doc._id;
        delete doc._createdOn;

        let beforeRequest = middleware.isExist(resource,'beforeRequest',doc._form_version) ? middleware.load(resource,'beforeRequest',doc._form_version) : defaultBeforeRequest;
        let afterRequest = middleware.isExist(resource,'afterRequest',doc._form_version) ? middleware.load(resource,'afterRequest',doc._form_version) : defaultAfterRequest;
        if(resource === 'system_forms'){
            middleware.save(doc.name,'beforeRequest',doc.version,doc.beforeRequest);
            middleware.save(doc.name,'afterRequest',doc.version,doc.afterRequest);
        }
        return new Promise((resolve,reject) => {
            beforeRequest(req,doc,resolve,reject);
        }).then(doc => {
            return new Promise((resolve,reject) => {
                db.update({_id:id},{$set : doc},{},(err,newDoc) => {
                    if(err){
                        reject({success:false,message:err.message});
                    }else{
                        resolve({success:true,data:newDoc});
                    }
                });
            });
        }).then(result => {
            return new Promise((resolve,reject) => {
                afterRequest(req,result,res,reject)
            });
        }).catch(err => {
            console.error(err);
            res.end(JSON.stringify({success:false,message:err.message}));
        });
    }catch(err){
        console.error(err);
    }

    
};