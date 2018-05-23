const {textToBase64,administrator,apiServer} = require("../../../config");
const fetch = require("node-fetch");
module.exports = async (req,res) => {
    // first we check if the login is 
    try{
        const userName = req.body.userName;
        const password = textToBase64(req.body.password);

        if(administrator.userName === userName && administrator.password === password){
            try {
                const sessionId = req.cookies.sessionId;
                let result = await fetch(`${apiServer}/v1/active-sessions`,{
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    method : 'post',
                    body: JSON.stringify({"sessionId": sessionId, account : {
                        "name" : "Administrator",
                        "group" : "Administrator"
                    }})
                });
                let data = await result.json();
                res.end(JSON.stringify(data));
            }catch(err){
                console.error(err);
            }
        }else{
            // we need to check the user database to get his data !!
        }
    }catch(err){
        console.error(err);
    }
};