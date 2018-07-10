/**
* req    : HttpRequest contains request object from user
* data   : JSON Body object after returned from database.
* res    : HttpResponse
* cancel : Function to cancel the action.
*/
module.exports = function(req,data,res,cancel){
    res.end(JSON.stringify(data));
}