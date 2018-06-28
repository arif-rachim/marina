const database = require('./database');

module.exports = (req,res) => {
    try{
        const doc = req.body;
        doc._lastUpdatedOn = new Date().getTime();
        const resource = req.params.resource;
        const db = database[resource];
        const id = req.params.id;
        delete doc._id;
        delete doc._createdOn;
        console.log('Updating '+JSON.stringify(doc));
        db.update({_id:id},{$set : doc},{},(err,newDoc) => {
            if(err){
                res.end(JSON.stringify({success:false,message:err.message}));
            }else{
                res.end(JSON.stringify({success:true,data:newDoc},null,2));
            }
        });
    }catch(err){
        console.error(err);
    }

    
};