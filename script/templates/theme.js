const notification = require('./components/notification');
const confirmation = require('./components/confirmation');
const menu = require('./index/menu');
module.exports = (req,content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Commander's Emerging Technology</title>
    <link href="/styles/reset.css" rel="stylesheet">
    <link href="/styles/font-family.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
</head>
<body style="font-family: 'PT Sans'; font-weight: 400; padding-left: 1em; padding-right: 1em; line-height: 1.4em; max-width: 1200px; margin: auto;display: flex;flex-direction: column">
<style>
    
    .heading-top {
        display: flex; 
        justify-content: center;
        background-image: url('/styles/spirit-of-union.png');
        background-repeat: no-repeat;
        background-position: right; 
        background-opacity: 0.5;
    }
    @media screen and (max-width:720px){
        .heading-top{
            background-image: url('/styles/spirit-of-union-small.png');
        }
    }
    @media screen and (max-width:450px){
        .heading-top{
            background-image: url('/styles/spirit-of-union-xsmall.png');
            background-position-y: 15px;
        }
    }
    
</style>
<section class="heading-top">
    <span style="padding-top:1em;padding-bottom:1em;">
        <div style="font-family: 'Abril Fatface', 'Arial Black', cursive; font-size: 2.3em; line-height: 1.4; text-align: center;">CETC</div>
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