const {base64ToText,administrator,fetch} = require("../../../config");
module.exports = async (req,res) => {
    try{
        // get all the accounts of this users
        const user = await fetch(`v1/active-sessions?sessionId=${req.cookies.sessionId}`);
        await fetch(`v1/active-sessions/${user.docs[0]._id}`,{},'delete');
        res.end(JSON.stringify({success:true,message:'user logout successfully'}));
    }catch(err){
        console.error(err);
    }

};