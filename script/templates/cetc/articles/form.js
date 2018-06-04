const { fetch } = require('../../../../config');

module.exports = (req) => {
    return `
        <script src="/node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
        <style>
            .articles-form {
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                align-items: flex-end;
            }
            .articles-form input[type="text"]{
                padding: 0.3em;
                width: 100%;
            }
            .articles-form label{
                display: block;
            }
            .articles-form .form-item {
                padding:0.3em;
                width: 100%;
                box-sizing: border-box;
            }
            
            .ck.ck-content.ck-editor__editable {
                min-height: 600px;
            }
            
            @media screen and (max-width: 430px){
                .articles-form div {
                    width: 100%;
                }
            }
            
        </style>
        
        <form class="articles-form" onsubmit="return false;">
        <input type="hidden" name="_id" id="_id">
        <input type="hidden" name="date" id="date">
        <div class="form-item" >
            <label for="url"> URL :</label>
            <div style="position: relative">
                <input type="text" name="URL" id="url" required class="form-control">
                <button class="btn load-button" style="position: absolute;right: 1px;top: 1px;padding: 0.25em;height: 33px;border-bottom-left-radius: 0px;border-top-left-radius: 0px">Load</button>
            </div>
        </div>
        <div class="form-item">
            <label for="title"> Title :</label>
            <input type="text" name="Title" id="title" required class="form-control">
        </div>
        <div class="form-item">
            <label for="description"> Description :</label>
            <input type="text" name="Description" id="description" required class="form-control">
        </div>
        <div class="form-item">
            <label for="image"> Image :</label>
            <input type="text" name="Image" id="image" required class="form-control">
        </div>
        <div class="form-item">
            <label for="content"> Content :</label>
            <textarea name="content" id="content" cols="30" rows="10" ></textarea>
        </div>
        <div style="width: 100%" class="form-item">
            <input type="submit" style="width: auto;" value="Save" class="btn btn-primary">
            <input type="reset" style="width: auto;margin-left:0.5em" class="btn">
        </div>
    </form>
    <script>
        (function(exports){
            exports.app = exports.app || {};
            var app = exports.app;
            document.querySelector('.articles-form').addEventListener('submit',submitForm);
            document.querySelector('.articles-form input[type="reset"]').addEventListener('click',clearForm);
            document.querySelector('.load-button').addEventListener('click',loadUrl);
            
            function loadUrl(event) {
                
                var textUrl = getValue('url');
                app.fetch('/svc/crawler.crawl',{
                        url : textUrl
                    }).then(function(article){
                    setValue('title',article.title);
                    setValue('description',article.description);
                    setContentValue(article.content);
                    if(article.images && article.images[0]){
                        setValue('image',article.images[0].url);    
                    }
                });
                event.preventDefault();
                return false;
            }
            
            var editor = null;
            
            ClassicEditor.create( document.querySelector( '#content' )).then(function(_editor){
                editor = _editor;
            });
            
            function getValue(id){
                return document.getElementById(id).value;
            }
            function setValue(id,value){
                document.getElementById(id).value = value;
            }
            
            function getContentValue(){
                return editor.getData();
            }
            function setContentValue(value){
                editor.setData(value);
            }
            
            function getSelected(id){
                return document.getElementById(id).checked;
            }
            
            function setSelected(id,value){
                if(document.getElementById(id)){
                    document.getElementById(id).checked = value;
                }
            }
            
            function clearForm() {
                setValue('url','');
                setValue('title','');
                setValue('description','');
                setValue('image','');
                setContentValue('');
                setValue('date','');
                setValue('_id','');
            }
            
            function submitForm() {
                
                try{
                    window.scrollTo(0,0);
                    var app = exports.app;
                    app.showConfirmation('Are you sure you want to Save ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes'){                            
                            var data = {
                                url: getValue('url'),
                                title: getValue('title'),
                                description: getValue('description'),
                                image: getValue('image'),
                                content: getContentValue(),
                                date : getValue('date') || moment().format('MMMM Do YYYY, h:mm:ss a')
                            };
                            
                            var id = getValue('_id'); 
                            fetch('/v1/cetc_articles'+(id?'/'+id:''),{
                              method : id ? 'PUT':'POST',
                              credentials:'same-origin',
                              headers:{
                                  'content-type':'application/json'
                              },
                              body:JSON.stringify(data)
                            }).then(function(result){
                              return result.json();
                            }).then(function(data){
                                if(app.showNotification){
                                    app.showNotification('Data saved successfully');    
                                }
                                if(app.refreshArticleListTable){
                                    app.refreshArticleListTable();
                                }
                              clearForm();
                            });
                       }
                    });
                  
                }catch(err){
                  console.error(err);
                }
            }
            
            function loadForm(id){
                app.fetch('/v1/cetc_articles/'+id).then(function(article){
                    clearForm();
                    if(article){
                        setValue('url',article.url);
                        setValue('title',article.title);
                        setValue('description',article.description);
                        setValue('image',article.image);
                        setContentValue(article.content);
                        setValue('date',article.date);
                        setValue('_id',article._id);    
                    }
                });
            }
            
            exports.app.submitArticleForm = submitForm;
            exports.app.loadArticleForm = loadForm;
            exports.app.clearArticleForm = clearForm;
        })(window);
    </script>
    `
};