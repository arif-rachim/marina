const {fetch} = require('../../../config');
module.exports = async (req,res) => {
    const resource = req.query.res;
    const formVersion = req.query.ver || NaN;
    let model = null;
    if(!isNaN(formVersion)){
        const result = await fetch(`/res/system_forms?name=|${resource}|&version=|${formVersion}|&$and=1`);
        model = result.docs[0];
    }else{
        const result = await fetch(`/res/system_forms?name=|${resource}|&$s.version=-1`);
        model = result.docs[0];
    }
    res.end(JSON.stringify(model));
}