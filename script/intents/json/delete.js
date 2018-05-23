const database = require('./database');

module.exports = (req,res) => {
    const resource = req.params.resource;
    const id = req.params.id;
    // first we need to get the yaml file and check if theres any validation here
    
    const db = database[resource];
    db.remove({ _id: id }, {}, (err, numRemoved) => {
        if(err){
            console.error(err);
            res.end(JSON.stringify(err,null,2));
        }else{
            console.log('Record deleted');
            res.end(JSON.stringify({success:true,message:'Record deleted'},null,2));
        }
    });

};