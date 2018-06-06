const {fetch} = require('../../../../config');
module.exports = async (req) => {
    const articleId = req.query.id;
    const article = await fetch(`/v1/cetc_articles/${articleId}`);

    return `
        <html>
            <head>
                <title>CETC</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                <link href="/styles/font-family.css " rel="stylesheet">
            </head>
            <body style="color: #333333;background: #FCFCFC">
                
                <div style="padding:1.5em;max-width: 750px;margin: auto;margin-top:0em;margin-bottom:0em;">
                    <div>
                    <div style="
                        font-family: 'Abril Fatface', sans-serif, cursive; 
                        font-size: 1.5em; 
                        line-height: 1.4; 
                        text-align: center;
                        display: inline-block;
                        ">CETC</div>                    
                        <style>
                            .back-button svg {
                                fill: #333333;
                            }
                        </style>
                        <div class="back-button" style="width: 2em;height: 2em;float:right;">
                            <a href="javascript:history.back()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"/></svg>
                            </a>
                        </div>
                    </div>

                    <article style="margin-top: 1em">
                        <h1 style="font-weight: 300;font-size: 2.5em ">${article.title}</h1>
                        <div style="font-style:italic;font-weight: 500">Published on ${article.date}</div>
                        <div>
                            <img src="${article.image}" alt="" style="width: 100%">
                        </div>
                        <div style="
                        font-family: 'Open Sans', sans-serif;
                        overflow: hidden;
                        font-size:1em;
                        font-weight:400 ;
                        margin-top: 1em;
                        letter-spacing: .005em;
                        line-height: 2.1em;">${article.content}</div>
                    </article>
                </div>
            </body>
        </html>
    `
}