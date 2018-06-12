const theme = require('../../theme');
const {fetch} = require('../../../../config');

const printArticles = (articles) => {
    return articles.map(article => {
        return `
        <div >
            <article >
                <div class="article-panel">
                    <div class="background-panel" >
                        <img src="${article.image}" class="border-with-radius" style="width: 100%;">
                    </div>
                    <div class="article-detail-panel">
                        <a href="/page/cetc.articles.article-public?id=${article._id}" style="text-decoration: none;color: #333333">
                            <h1 class="article-title">${article.title}</h1>
                        </a>
                        <h5 class="article-published-date">Published on ${article.date}</h5>
                        <p class="article-description">${article.description}</p>
                    </div>
                </div>
            </article>
        </div>
        `
    }).join('');
};

module.exports = async (req) => {
    try {
        let articles = await fetch('/res/cetc_articles?$s._createdOn=-1');
        articles = articles.docs;
        return theme(req, `
            <style>
            
                .border-with-radius{
                    border:1px solid #eeeeee;
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
                    font-size: 0.8em; 
                    color: #888; 
                    padding-top: 0em; 
                    padding-bottom: 0em;
                }
                
                .article-panel .article-description{
                    width: 100%;
                    letter-spacing: 0.03em
                }
                
                @media screen and (max-width: 900px){
                    
                    .article-panel .article-title {                
                        font-weight: 400;
                        margin-top:0.5em; 
                        font-size: 1.5em; 
                        line-height: 1.4;
                    }
                    
                    .article-panel .article-published-date{
                        
                        font-size: 0.8em; 
                        color: #888; 
                        padding-top: 0em; 
                        padding-bottom: 0em;
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
            <div style="width: 200px;margin-top:1em;">
                <input type="text" class="form-control search-article" placeholder="Search Article">
            </div>
            <div style="display: flex;flex-direction: column;margin-top:1em" class="article-container">
                ${printArticles(articles)}
            </div>
            <script >
                (function(exports){
                    exports.app = exports.app || {};
                    var app = exports.app;
                    document.querySelector('.search-article').addEventListener('keyup',debounce(onSearch,500));
                    
                    function onSearch(event){
                        var text = event.target.value;
                        App.net.fetch('/res/cetc_articles?$s._createdOn=-1&title='+text+'&description='+text).then(function(result){
                            document.querySelector('.article-container').innerHTML = printArticles(result.docs); 
                        });
                    }
                    
                    function printArticles(articles){
                        return articles.map(article => {
                            return'<div >'+
                            '    <article >'+
                            '        <div class="article-panel">'+
                            '            <div class="background-panel" >'+
                            '                <img src="'+article.image+'" class="border-with-radius" style="width: 100%;">'+
                            '            </div>'+
                            '            <div class="article-detail-panel">'+
                            '                <a href="/page/cetc.articles.article-public?id='+article._id+'" style="text-decoration: none;color: #333333">'+
                            '                    <h1 class="article-title">'+article.title+'</h1>'+
                            '                </a>'+
                            '                <h5 class="article-published-date">Published on '+article.date+'</h5>'+
                            '                <p class="article-description">'+article.description+'</p>'+
                            '            </div>'+
                            '        </div>'+
                            '    </article>'+
                            '</div>'
                        }).join('');
                    };
                    
                    function debounce(func, wait, immediate) {
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
                    
                })(window);
            </script>
        `);
    } catch (e) {
        console.error(e);
    }
    return '';
};