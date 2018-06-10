const notification = require('./components/notification');
const confirmation = require('./components/confirmation');
const menu = require('./index/menu');
module.exports = (req,content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Commander's Emerging Technology</title>
    <link href="/styles/font-family.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"></script>
    <script src="/node_modules/whatwg-fetch/fetch.js"></script>
    <script src="/node_modules/moment/moment.js"></script>
    <script src="/script/client/app.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="/styles/loader.css">
</head>
<style>
    body{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        padding-left: 1em; 
        padding-right: 1em; 
        line-height: 1.4em; 
        max-width: 1200px; 
        margin: auto;
        display: flex;
        flex-direction: column;
        font-size: medium;
        
        background: rgba(255,255,255,1);
        background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 13%, rgba(252,252,252,1) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(13%, rgba(255,255,255,1)), color-stop(100%, rgba(252,252,252,1)));
        background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 13%, rgba(252,252,252,1) 100%);
        background: -o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 13%, rgba(252,252,252,1) 100%);
        background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 13%, rgba(252,252,252,1) 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 13%, rgba(252,252,252,1) 100%);

    }
    
    @media screen and (max-width: 380px){
        body {
            font-size: smaller;
        }
    }
    
    .blockquote {
        font-size: inherit;
    }
    
    table {
        font-size: inherit;
    }
</style>
<body>
<script>
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

    (function(exports){
        exports.app = exports.app || {};
        var app = exports.app;
        app.fetch = function(url,json,method,showLoader){
            if(showLoader !== false){
                showLoader = true;
            }
            if(showLoader){
                app.loader(true);    
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
                app.loader(false);
                return data;
            }).catch(function(error){
                console.log(error);
                app.loader(false);
            });
        };
        app.loader = function(loader){
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
    })(window);

</script>


<style>
    .font-title{
        font-family: 'Abril Fatface', 'Arial Black', 'Segoe UI', Roboto,'Helvetica Neue',Arial,sans-serif;
    }
    .heading-top {
        display: flex; 
        justify-content: center;
        background-image: url('/styles/spirit-of-union.png');
        background-repeat: no-repeat;
        background-position: right; 
        background-opacity: 0.5;
    }
    
    .heading-top .title{
        font-size: 2.3em; 
        line-height: 1.4; 
    }
    
    .menu {
        font-size: medium;
    }
    
    @media screen and (max-width:720px){
        .heading-top{
            background-image: url('/styles/spirit-of-union-small.png');
        }
    }
    @media screen and (max-width:570px){
        .heading-top{
            background-image: none;
            background-position-y: 15px;
        }
        .heading-top .title{
            font-size: 1.5em; 
            line-height: 1; 
        }
    }
    
</style>
<section class="heading-top">
    <span style="padding-top:1em;">
        <div class="font-title title" style="text-align: center;">CETC</div>
        <p style="font-family: 'PT Serif', serif; line-height: 1.5; font-style: italic; text-align: center;">Commander's Emerging Technology Center</p>
    </span>
</section>
${req.print(menu(req))}
<div style="position: relative">
    <div style="position: relative;bottom: 0px">
    <div style="position: absolute;width:100%;">
    ${req.print(confirmation(req))}
    </div>
</div>
</div>
<div style="flex: 1 1 auto;">
${content}
</div>
<div class="app-loader hide">
    <div class="loader-container">
        <div class="block block-1"></div>
        <div class="block block-2"></div>
        <div class="block block-3"></div>
    </div>
</div>

<section style="margin-bottom: 1em;border-top:1px solid #ddd">
    <span>
        <div style="font-family: 'Abril Fatface', 'Arial Black', cursive; font-size: 1.5em; line-height: 1.4; text-align: center;">CETC</div>
        <p style="font-family: 'PT Serif', serif; line-height: 1.5; font-style: italic; text-align: center;">Commander's Emerging Technology Center</p>
    </span>
</section>
${req.print(notification(req))}
</body>
</html>
`;