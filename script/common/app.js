
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}

if (!('forEach' in NodeList.prototype)) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

var App = {};
(function(app){
    app.utils = app.utils || {};
    app.utils.formatDateTime = function(date){
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

    app.utils.debounce = function (func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    app.utils.guid = function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

})(App);

(function(app){
    app.net = app.net || {};
    app.net.fetch = function(url,json,method,showLoader){
        if(showLoader !== false){
            showLoader = true;
        }
        if(showLoader){
            loader(true);
        }
        method = (undefined === method || null === method) ? ( json ? 'POST' : 'GET' ) : method;
        var requestConfig = {
            method : method,
            headers : {
                'content-type' : 'application/json'
            },
            credentials : 'same-origin',
            body : JSON.stringify(json)
        };
        if(method.toUpperCase() === 'GET'){
            delete requestConfig.body;
        }
        return fetch(url,requestConfig).then(function(response){
            return response.json();
        }).then(function(data){
            loader(false);
            return data;
        }).catch(function(error){
            console.log(error);
            loader(false);
        });
    };

    function loader(loader){
        var loaderPanel = document.querySelector('.app-loader');
        if(loader){
            loaderPanel.style.display = 'flex';
            loaderPanel.classList.remove('hide');
        }else{
            loaderPanel.classList.add('hide');
            setTimeout(function(){
                loaderPanel.style.display = 'none';
            },300);
        }
    };
})(App);

(function (app){
    var topics = {};
    app.pubsub = app.pubsub || {};
    app.pubsub.subscribe = function(topic,func){
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

    app.pubsub.publish = function(topic,data){
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
    }
})(App);