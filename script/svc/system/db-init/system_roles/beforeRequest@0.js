/**
* req    : HttpRequest contains request object from user
* data   : JSON Body object
* next   : Function to continue the action to database.
* cancel : Function to cancel the action.
*/
module.exports = function(req,data,next,cancel){
    next(data);
}