const fetch = require("node-fetch");
const apiServer = process.env.API_SERVER || 'http://localhost:8000';
module.exports = async (req,res) => {
    try {
        const sessionId = req.cookies.sessionId;
        let result = await fetch(`${apiServer}/v1/users?sessionId=${sessionId}`);
        let data = await result.json();
        res.end(JSON.stringify(data));
    }catch(err){
        console.error(err);
    }
};