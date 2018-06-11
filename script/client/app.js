var PubSub = {};
(function (p){
    var topics = {};
    p.subscribe = function(topic,func){
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

    p.publish = function(topic,data){
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
        }));
    }
})(PubSub);

(function(exports){
    exports.app = exports.app || {};
    var app = exports.app;

    app.formatDateTime= function(date){
        if(date === undefined || date.toString() === 'Invalid Date'){
            return '';
        }
        const monthNames = [
            "JAN", "FEB", "MAR",
            "APR", "MAY", "JUN", "JUL",
            "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var applyLeadingZero = function(num){
            return num < 10 ? '0'+num : num;
        };
        return applyLeadingZero(day)+'-'+monthNames[monthIndex]+'-'+year+' '+applyLeadingZero(hours)+':'+applyLeadingZero(minutes);
    };
})(window);
