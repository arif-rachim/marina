const database = require('./database');

module.exports = (req,res) => {
    const doc = req.body;
    const resource = req.params.resource;
    const id = req.body.id;
    // first we need to get the yaml file and check if theres any validation here
    const db = database[resource];
    db.remove({ _id: id }, {}, (err, numRemoved) => {
        if(err){
            res.end(JSON.stringify(err,null,2));
        }else{
            res.end(JSON.stringify({success:true,message:'Record deleted'},null,2));
        }
    });
};