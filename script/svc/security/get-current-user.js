const fetch = require("node-fetch");
const {apiServer} = require("../../../config");
module.exports = async (req,res) => {
    try {
        const sessionId = req.cookies.sessionId || req.query.sessionId;
        let result = await fetch(`${apiServer}/v1/active-sessions?sessionId=${sessionId}`);
        let data = await result.json();
        if(data.docs && data.docs.length > 0){
            res.end(JSON.stringify(data.docs[0]));
        }
        res.end(JSON.stringify({
            message : 'No active session exist'
        }));
    }catch(err){
        console.error(err);
    }
};