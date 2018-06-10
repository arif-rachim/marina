const theme = require('../../theme');
const form = require('./form');
const list = require('./list');

module.exports = async (req) => {
    return theme(req,`
    <style>
        .article-list-right{
            width: 100%;
            box-sizing: border-box;
        }
        .article-list-left {
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 1.5em;
         }
         
         .hidden {
            display: none;
         }
         
         @media screen and (max-width:900px){
            .article-list-right {
                width : 100%;
                padding:0em;
            }
            .article-list-left {
                width : 100%;
                padding:0em;
            }
         }
    </style>
    <div style="display: flex;align-items: center;margin-top:1em;margin-bottom: 1em;">
        <div style="color: #333333;white-space: nowrap" class="add-article-button" onclick="PubSub.publish('cetc.articles.page:form')">
            <i class="fas fa-plus-circle" style="font-size: 1.5em"></i><span style="margin-left: 0.3em">Add Article</span>
        </div>
        <h1 style="font-size: 1.2em;font-style: italic;text-align:right;width: 100%;margin:0px">Articles Management</h1>
    </div>
    <div style="display: flex;flex-wrap:wrap">
        <div class="article-list-left">
            ${req.print(list(req))}
        </div>
        <div class="article-list-right hidden" >
            ${req.print(form(req))}
        </div>
    </div>
    <script>
    
        (function(exports){
            exports.app = exports.app || {};
            var app = exports.app;
            
            var articleList = document.querySelector('.article-list-left');
            var articleForm = document.querySelector('.article-list-right');
            var addArticleButton = document.querySelector('.add-article-button');
            
            PubSub.subscribe('cetc.articles.page:list',function(){
                articleList.classList.remove('hidden');
                addArticleButton.classList.remove('hidden');
                articleForm.classList.add('hidden');
            });
            
            PubSub.subscribe('cetc.articles.page:form',function(){
                articleList.classList.add('hidden');
                addArticleButton.classList.add('hidden');
                articleForm.classList.remove('hidden');
            });
            
            
        })(window);
    </script>
    
    
    
    `);
};