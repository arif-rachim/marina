const formatDateTime = (date) => {
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

const debounce = (func, wait, immediate) => {
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

const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const merge = (one,two) => {
    const result = {};
    for(let key in one){
        if(one.hasOwnProperty(key)){
            result[key] = one[key];
        }
    }
    for(let key in two){
        if(two.hasOwnProperty(key)){
            result[key] = two[key];
        }
    }
    return result;
};

module.exports = {
    debounce,guid,formatDateTime,merge
};