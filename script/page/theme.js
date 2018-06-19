const notification = require('./components/notification');
const confirmation = require('./components/confirmation');
const loader = require('./components/loader');
const menu = require('./index/menu');
module.exports = (req,content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Commander's Emerging Technology</title>
    <link rel="stylesheet" href="/styles/font-family.css" >
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!--
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    -->
    <script src="/svc/system.module?path=common.polyfill&name=polyfill"></script>
    <script src="/script/common/app.js"></script>
    <link rel="stylesheet" href="/styles/bootstrap.min.css">
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
${req.print(confirmation(req))}
<div style="flex: 1 1 auto;">
${content}
</div>
<section style="margin-bottom: 1em;border-top:1px solid #ddd">
    <span>
        <div style="font-family: 'Abril Fatface', 'Arial Black', cursive; font-size: 1.5em; line-height: 1.4; text-align: center;">CETC</div>
        <p style="font-family: 'PT Serif', serif; line-height: 1.5; font-style: italic; text-align: center;">Commander's Emerging Technology Center</p>
    </span>
</section>
${req.print(notification(req))}
${req.print(loader(req))}
</body>
</html>
`;