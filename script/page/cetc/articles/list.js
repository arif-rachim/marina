const {fetch} = require('../../../../config');

const formatDateTime = (date) => {
    if(date === undefined || date.toString() === 'Invalid Date'){
        return '';
    }
    const monthNames = [
        "JAN", "FEB", "MAR",
        "APR", "MAY", "JUN", "JUL",
        "AUG", "SEP", "OCT",
        "NOV", "DEC"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const applyLeadingZero = (num) => num < 10 ? `0${num}` : num;
    return `${applyLeadingZero(day)}-${monthNames[monthIndex]}-${year} ${applyLeadingZero(hours)}:${applyLeadingZero(minutes)}`;
};

function printArticlesTable(articles) {
    return articles.map(article => `
        <tr data-id="${article._id}">
            <td><img src="${article.image}" alt="" style="width: 100%"></td>
            <td>${formatDateTime(new Date(article._createdOn)) || ''}</td>
            <td>${article.title || ''}</td>
            <td>
                <i class="far fa-trash-alt" data-id="${article._id}" onclick="event.stopPropagation();app.deleteArticle(event);"></i>
            </td>
        </tr>
    `).join('');
}

module.exports = async (req) => {
    let articles = await fetch('/res/cetc_articles');
    articles = articles.docs;
    return `
        <style>
            .article-list-table th , td {
                padding: 0.3em;
                
            }
            .article-list-table th  {
                text-align: left;
            }
            
            .article-list-table thead {
                border-bottom: 1px solid #000000;
            }
            
            .article-list-table tr {
                border-bottom: 1px solid #cccccc;
            }
            
            .article-list-table {
                width: 100%;
                
            }
            .article-list-table tr.selected{
                background: #eeeeee;
            }
            
            .col-published-date {
                width: 100px;
            }
        </style>
        
        <table class="article-list-table" cellspacing="0">
            <col width="150">
            <col width="160">
            <col width="auto">
            <col width="40">
            <thead>
                <tr style="height: 2.2em;">
                    <th>Image</th>
                    <th class="col-published-date">Published Date</th>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${printArticlesTable(articles)}
            </tbody>
        </table>
        <script>
            (function(exports){
                exports.app = exports.app || {};
                var app = exports.app;
                
                function onTrClicked(event) {
                    document.querySelectorAll('.article-list-table tr').forEach(function(tr){
                        tr.classList.remove('selected');
                    }); 
                    event.currentTarget.classList.add('selected');
                    app.loadArticleForm(event.currentTarget.getAttribute('data-id'));
                }
                
                function populateListeners(){
                    document.querySelectorAll('.article-list-table tr').forEach(function(tr){
                        tr.addEventListener('click',onTrClicked);
                    });    
                }
                
                function deleteArticle(event){
                    var id = event.target.getAttribute('data-id');
                    app.showConfirmation('Are you sure you want to delete ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes' ){
                            fetch('/res/cetc_articles/'+id,{
                                method : 'DELETE',
                                credentials : 'same-origin',
                                header : {
                                    'content-type' : 'application-json'
                                }
                            }).then(function(result){
                                return result.json();
                            }).then(function(){
                                app.showNotification('Article deleted.');
                                refreshArticleListTable();
                                app.clearArticleForm();
                            });        
                        }    
                    });
                }
                
                function formatDateTime(date) {
                    if(date === undefined || date.toString() === 'Invalid Date'){
                        return '';
                    }
                    const monthNames = [
                        "JAN", "FEB", "MAR",
                        "APR", "MAY", "JUN", "JUL",
                        "AUG", "SEP", "OCT",
                        "NOV", "DEC"
                    ];
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var applyLeadingZero = function(num){
                        return num < 10 ? '0'+num : num;
                    };
                    return applyLeadingZero(day)+'-'+monthNames[monthIndex]+'-'+year+' '+applyLeadingZero(hours)+':'+applyLeadingZero(minutes);
                };
                
                
                function refreshArticleListTable(){
                    fetch('/res/cetc_articles').then(function(results){
                        return results.json();
                    }).then(function(result){
                        var articles = result.docs;
                        document.querySelector('.article-list-table tbody').innerHTML = articles.map(function(article){
                            return '<tr data-id="'+article._id+'">' +
                             '<td><img src="'+article.image+'" alt="" style="width: 100%"></td>'+
                             '<td>'+formatDateTime(new Date(article._createdOn))+'</td>' +
                             '<td>'+article.title+'</td>' +
                             '<td><i class="far fa-trash-alt" data-id="'+article._id+'" onclick="event.stopPropagation();app.deleteArticle(event);"></i></td>' +
                              '</tr>';
                        }).join('');
                        populateListeners();
                    });
                }
                populateListeners();
                exports.app.refreshArticleListTable = refreshArticleListTable;
                exports.app.deleteArticle = deleteArticle;
            })(window)
            
        </script>
    `
}