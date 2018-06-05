const {fetch} = require('../../../config');

module.exports = (req,res) => {
    const to = req.body.to;
    const name = req.body.name;
    const userId = req.body.userId;
    const password = req.body.password;

    const subject = 'Welcome to CETC (Commanders Emerging Technology Center)';
    const messageText = `You have been added to CETC Membership access and now will be among the first to hear about 
    future technologies in Commercial Industry, Academia and Other Goverment Agencies.`;
    const messageHtml = message({name,userId,password});
    console.log('We have htmlMessage '+messageHtml);
    fetch('/svc/system.mail-sender',{
        to : to,
        subject : subject,
        text : messageText,
        html : messageHtml
    },'POST').then(function(result){
        req.end(JSON.stringify(result));
    });
};

const message = ({name,userId,password}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
        <title>CETC Portal</title>
    </head>
    <style>
            body {
                font-family: 'PT Sans', sans-serif;
            }
        </style>
    <body>
        <h1>
            Welcome ${name}
        </h1>
        <p>
            You have been added to CETC Membership access and now will be among the first to hear about future technologies in Commercial Industry, Academia and Other Goverment Agencies.
        </p>
        <p>
            Please follow this <a href="https://www.cetc.ae"> link to access CETC </a>, and your login access is :
        </p>
        <div>
            <label>User ID</label>
            <span>${userId}</span>
        </div>
        <div>
            <label>Password</label>
            <span>${password}</span>
        </div>
        <p>We hope you're enjoying a great experience with us.</p>
    </body>
    </html>
    `
};