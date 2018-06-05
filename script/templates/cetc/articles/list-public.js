const theme = require('../../theme');
const {fetch} = require('../../../../config');

const printArticles = (articles) => {
    return articles.map(article => {
        return `
        <div style="padding: 1em;border-bottom: 1px solid #EEEEEE" >
            <article >
                <div class="article-panel">
                    <div class="background-panel" >
                        <img src="${article.image}" class="border-with-radius" style="width: 100%;">
                    </div>
                    <div class="article-detail-panel">
                        <h1 class="article-title">${article.title}</h1>
                        <h5 class="article-published-date">Published on ${article.date}</h5>
                        <p class="article-description">${article.description}</p>
                    </div>
                </div>
            </article>
        </div>
        `
    }).join('');
};

module.exports  = async (req) => {
    try{
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
        
        .article-panel {
            display: flex;
        }
        
        .article-panel .background-panel {
            width: 30%;
            border-radius: 10px;
        }
        
        .article-panel .background-panel img {
            margin-bottom: 1em;
        }
        
        .article-panel .article-detail-panel {
            width: 70%;
            padding-left:1em;
            display: flex;
            flex-direction: column;
        }
        
        .article-panel .article-title {
            font-weight: 400;
            font-size : 1.5em;
        }
        
        
        .article-panel .article-published-date{
            font-size:0.8em;
        }
        
        .article-panel .article-description{
            font-weight: 300;
            font-size:1em;
        }
        
        @media screen and (max-width: 900px){
            
            .article-panel .article-title {
                font-weight: 500;
                font-size:1.2em;
            }
            
            .article-panel .article-published-date{
                font-size:0.8em;
            }
            
            .article-panel .article-description{
                font-weight: 400;
                font-size:1em;
            }
        }
        
        @media screen and (max-width: 650px){
            .article-panel {
                flex-direction: column;
            }
            .article-panel .background-panel{
                width: 100%;
            }
            
            .article-panel .article-detail-panel{
                width: 100%;
                padding: 0px;
            }
            
            .article-panel .background-panel img {
                
            }
        }
    </style>

    <div style="display: flex;flex-direction: column">
    ${printArticles(articles)}
    </div>`);
    }catch (e) {
        console.error(e);
    }
    return '';
};