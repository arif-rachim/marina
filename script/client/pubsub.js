var topics = {};

const subscribe = function(topic,func){
    if(!topics.hasOwnProperty(topic)){
        topics[topic] = [];
    }
    var topicArray = topics[topic];
    topicArray.push(func);
    return {
        unsubscribe : function (){
            var index = topicArray.indexOf(func);
            topicArray.splice(index,1);
        }
    }
};

const publish = function(topic,data){
    var topicArray = topics[topic];
    return Promise.all(topicArray.map(function(func){
        var result = func.apply(null,[data]);
        if(result){
            if(result.hasOwnProperty('then')){
                return result;
            }
            return Promise.resolve(result);
        }
        return Promise.resolve(true);
    })).then(function(results){
        if(results.length == 1){
            return Promise.resolve(results[0]);
        }
        return Promise.resolve(results);
    });
};

module.exports = {subscribe,publish};