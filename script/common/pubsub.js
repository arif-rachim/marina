if(window == null || window == undefined){
    window = this;
}

window.app = window.app || {};
window.app.topics = window.app.topics || {};
const topics = window.app.topics;

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
    if(topicArray && topicArray.length > 0){
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
    }

};

window.app.publish = window.app.publish || publish;

module.exports = {subscribe,publish};