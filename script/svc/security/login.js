const {textToBase64,administrator,apiServer,fetch} = require("../../../config");
const AES = require('crypto-js/aes');
const UTF8 = require('crypto-js/enc-utf8');
module.exports = async (req,res) => {
    try{
        const user_name = req.body.userName;
        const password = req.body.password;
        let user = await fetch(`/res/system_user_account?user_name=${user_name}`);
        user = user && user.docs && user.docs.length ? user.docs[0] : false;

        const bytes  = AES.decrypt(user.password, 'AES');
        const userPassword = bytes.toString(UTF8);

        if(user && userPassword == password){
            try {
                const sessionId = req.cookies.sessionId;
                const session = await fetch(`/res/system_active_sessions`,{
                    session_id : sessionId,
                    account : user
                },'POST');
                res.end(JSON.stringify(session));
            }catch(err){
                console.error(err);
                err.success = false;
                res.end(err);
            }
        }else{
            res.end(JSON.stringify({success:false,message:'Unable to find user or wrong password'}));
        }
    }catch(err){
        err.success = false;
        console.error(err);
        res.end(JSON.stringify(err));
    }
};