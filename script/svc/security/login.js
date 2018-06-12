const {textToBase64,administrator,apiServer,fetch} = require("../../../config");
module.exports = async (req,res) => {
    // first we check if the  is
    try{
        const userId = req.body.userName;
        const password = textToBase64(req.body.password);
        let user = await fetch(`/res/system_users?userId=${userId}`);
        user = user && user.docs && user.docs.length ? user.docs[0] : false;
        if(user && user.password == password){
            try {
                const sessionId = req.cookies.sessionId;
                const session = await fetch(`/res/system_active_sessions`,{
                    sessionId : sessionId,
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