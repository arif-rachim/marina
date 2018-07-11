const {base64ToText,administrator,fetch} = require("../../../config");
module.exports = async (req,res) => {
    try{
        // get all the accounts of this users
        const user = await fetch(`/res/system_active_sessions?session_id=${req.cookies.sessionId}`);
        await fetch(`/res/system_active_sessions/${user.docs[0]._id}`,{},'delete');
        res.end(JSON.stringify({success:true,message:'user logout successfully'}));
    }catch(err){
        err.success = false;
        console.error(err);
        res.end(JSON.stringify(err));
    }

};