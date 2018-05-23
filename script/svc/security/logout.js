const {base64ToText,administrator,apiServer} = require("../../../config");
const fetch = require("node-fetch");
module.exports = async (req,res) => {
    // get all the accounts of this users
    const result = await fetch(`${apiServer}/v1/active-sessions?sessionId=${req.cookies.sessionId}`);
    const json = await result.json();
    console.log(json);
}