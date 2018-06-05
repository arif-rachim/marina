const theme = require('../../theme');
const {fetch} = require('../../../../config');

const printArticles = (articles) => {
    return articles.map(article => {
        return `
        <div style="padding: 1em;border-bottom: 1px solid #EEEEEE" >
            <article >
                <div style="display: flex">
                    <div style="
                    width: 30%;">
                    <img src="${article.image}" alt="" style="width: 100%;">
                    </div>
                    <div style="width: 70%;padding-left:1em;display: flex;flex-direction: column">
                        <h1 style="font-weight: 400;font-size:1.5em">${article.title}</h1>
                        <h5 style="font-size:1em">Published on ${article.date}</h5>
                        <div style="overflow: hidden;position: relative;flex: 1 1 auto;">
                            <p style="font-weight: 300;font-size:1em;position:absolute;top:0px;left: 0px;">${article.description}</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        `
    }).join('');
};

module.exports  = async (req) => {
    let articles = await fetch('/v1/cetc_articles');
    articles = articles.docs;
    return theme(req,`
    <style>
    
        .border-with-radius{
            border:1px solid #eeeeee;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
        }
    </style>

    <div style="padding: 1em;display: flex;flex-direction: column">
    ${printArticles(articles)}
    </div>`);
};