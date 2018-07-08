const database = require('./database');
const middleware = require('./middleware');

module.exports = (req,res) => {
    const resource = req.params.resource;
    const id = req.params.id;
    const db = database[resource];

    db.findOne({_id:id.trim()},(err,data) => {
        if(resource === 'system_forms') {
            middleware.remove(data.name, 'beforeRequest', data.version);
            middleware.remove(data.name, 'afterRequest', data.version);
        }
        db.remove({ _id: id }, {}, (err, numRemoved) => {
            if(err){
                console.error(err);
                res.end(JSON.stringify({success:false,message:err.message}));
            }else{
                res.end(JSON.stringify({success:true,message:'Record deleted'},null,2));
            }
        });
    });
};