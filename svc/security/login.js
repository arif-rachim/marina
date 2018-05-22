

module.exports = (req,res) => {
    try{
        const userName = req.body.userName;
        const password = req.body.password;
        res.end(JSON.stringify({
            success: true,
            account: {
                name : 'User',
                id : 'user'
            }
        }));
    }catch(err){
        console.err(err);
    }
}