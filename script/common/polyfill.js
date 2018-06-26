
if(!('Promise' in window)){
    window.Promise = require('promise-polyfill');
}


if(!('fetch' in window)){
    require('./polyfill-fetch');
}


if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that ) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}

if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that) {
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

// here we are introducing mutation observer for firing load when an event is added to panel
var mutationObserver = new MutationObserver(function(mutationList){
    mutationList.forEach(function(mutation){
        if(mutation.type == 'childList'){
            mutation.addedNodes.forEach(node => {
                if(node.tagName == 'DIV' && node.onload){
                    node.dispatchEvent(new Event('load'));
                }
            });
        }
    });
});

window.addEventListener('load',function(){
    mutationObserver.observe(document.body,{childList:true,subtree:true});
    document.querySelectorAll('div[onload]').forEach(function (node) {
        node.dispatchEvent(new Event('load'));
    })
});

module.exports = {

};