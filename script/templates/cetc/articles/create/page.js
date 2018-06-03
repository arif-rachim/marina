const theme = require('../../../theme');
module.exports = async (req) => {
    return theme(req,`
        <script src="/node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
        <style>
            .ck.ck-content.ck-editor__editable {
                min-height: 600px;
            }
        </style>
        <div>
            <h1 style="font-size: 1.3em;font-style: italic;padding-top:1em;text-align: right">Create Article</h1>
            <div >
                <label>Article URL</label>
                <div style="position: relative">
                    <input type="text" name="articleUrl" style="padding: 0.3em;width: 100%;" class="form-control">
                    <button class="load-button btn btn-primary" style="border-top-left-radius: 0px;border-bottom-left-radius: 0px;position: absolute;right: 0px;top:0px;height: 35px;font-size: 0.9em">Load</button>
                </div>    
            </div>
            <form onsubmit="return false" class="article-form">
            <div>
                <div style="margin-top:1em">
                    <label>Title</label>
                    <input type="text" name="title" style="padding: 0.3em;width: 100%;" class="form-control" required>
                </div>
                <div style="margin-top:1em">
                    <label>Description</label>
                    <textarea style="width: 100%;height: 50px" name="description" class="form-control" required></textarea>
                </div>
                <div style="margin-top:1em">
                    <label>Image Path</label>
                    <input type="text" name="imagePath" style="padding: 0.3em;width: 100%;" class="form-control" >
                    <img name="imagePath" style="width: 100%">
                </div>
                <div style="margin-top:1em;" >
                    <label>Content</label>
                    <div id="content-editor" style="width: 100%;">
                    </div>
                </div>
                <div style="padding: 1em 0em;text-align: right">
                    <button type="submit" class="btn btn-primary save-button">Post Article</button>
                </div>
            </div>
            </form>
        </div>
        
        <script>
        (function(exports){
            exports.app = exports.app || {};
            var app = exports.app;
            
            var loadButton = document.querySelector('.load-button');
            var inputArticle = document.querySelector('input[name="articleUrl"]');
            var inputTitle = document.querySelector('input[name="title"]');
            var inputDescription = document.querySelector('textarea[name="description"]');
            var inputImagePath = document.querySelector('input[name="imagePath"]');
            var imageContainer = document.querySelector('img[name="imagePath"]');
            var saveButton = document.querySelector('.save-button');
            var articleForm = document.querySelector('.article-form');
            
            articleForm.addEventListener('submit',onPostArticle);
            
            function onPostArticle(event) {
                window.scrollTo(0,0);
                app.showConfirmation('Are you sure you want to Post the Article ?',['Yes','No'],function(btn){
                    if(btn.innerText === 'Yes'){
                        
                    }
                });
            }
            
            ClassicEditor.create( document.querySelector( '#content-editor' ) ).then(function(inputContent){
                
                
                loadButton.addEventListener('click',function(){
                    var textUrl = inputArticle.value;
                    fetch('/svc/crawler.crawl',{
                        method : 'POST',
                        headers : {
                            'content-type' : 'application/json'
                        },
                        credentials : 'same-origin',
                        body : JSON.stringify({
                            url : textUrl
                        })
                    }).then(function(response){
                        return response.json();
                    }).then(function(article){
                        inputTitle.value = article.title;
                        inputDescription.innerText = article.description;
                        inputContent.setData(article.content);
                        inputImagePath.value = article.images[0].url;
                        imageContainer.src = article.images[0].url;
                    });
                });
            
                
            }).catch(function(error) {
                console.error( error );
            });    
            
        })(window);
        
        </script>
    `);
};