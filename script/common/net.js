require('polyfill');
const appFetch = (url,json,method,showLoader) => {
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

module.exports = {fetch:appFetch};