const database = require('./database');

module.exports = (req,res) => {
    const resource = req.params.resource;
    const id = req.params.id;
    const db = database[resource];
    db.remove({ _id: id }, {}, (err, numRemoved) => {
        if(err){
            console.error(err);
            res.end(JSON.stringify({success:false,message:err.message}));
        }else{
            res.end(JSON.stringify({success:true,message:'Record deleted'},null,2));
        }
    });

};