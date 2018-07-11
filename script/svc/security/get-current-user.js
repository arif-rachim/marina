const fetch = require("node-fetch");
const {apiServer} = require("../../../config");
module.exports = async (req,res) => {
    try {
        const sessionId = req.cookies.sessionId || req.query.sessionId;
        let result = await fetch(`${apiServer}/res/system_active_sessions?session_id=${sessionId}`);
        let data = await result.json();
        if(data.docs && data.docs.length > 0){
            res.end(JSON.stringify(data.docs[0]));
        }
        res.end(JSON.stringify({
            success : false,
            message : 'No active session exist'
        }));
    }catch(err){
        err.success = false;
        console.error(err);
        res.end(JSON.stringify(err));
    }
};