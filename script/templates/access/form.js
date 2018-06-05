const { fetch } = require('../../../config');

module.exports = (req) => {
    return `
        <style>
            .access-form {
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                align-items: flex-end;
            }
            .access-form input[type="text"]{
                padding: 0.3em;
                width: 100%;
            }
            
            .access-form label{
                display: block;
            }
            .access-form div {
                padding:0.3em;
                width: 100%;
                box-sizing: border-box;
            }
            
            @media screen and (max-width: 430px){
                .access-form div {
                    width: 100%;
                }
            }
            
        </style>
        <form class="access-form" onsubmit="return false;">
        <input type="hidden" name="_id" id="_id">
        <div >
            <label for="name"> Name :</label>
            <input type="text" name="Name" id="name" required class="form-control" placeholder="Enter name">
        </div>
        <div >
            <label for="shortName"> Short Name :</label>
            <input type="text" name="ShortName" id="shortName" required class="form-control" placeholder="Enter shortname">
        </div>
        <div >
            <label for="description"> Description :</label>
            <input type="text" name="Description" id="description" required class="form-control" placeholder="Enter description">
        </div>
        <div >
            <label for="path"> Path :</label>
            <input type="text" name="Path" id="path" required class="form-control" placeholder="Enter path">
        </div>
        <div style="width: 100%">
            <input type="submit" style="width: auto;" value="Save" class="btn btn-primary">
            <input type="reset" style="width: auto;margin-left:0.5em" class="btn">
        </div>
    </form>
    <script>
        (function(exports){
            exports.app = exports.app || {};
            
            document.querySelector('.access-form').addEventListener('submit',submitForm);
            document.querySelector('.access-form input[type="reset"]').addEventListener('click',clearForm);
            document.querySelector('input[name="Path"]').addEventListener('change',validatePath);

            function getValue(id){
                return document.getElementById(id).value;
            }
            function setValue(id,value){
                document.getElementById(id).value = value;
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
                setValue('name','');
                setValue('shortName','');
                setValue('description','');
                setValue('path','');
                setValue('_id','');
            }
            
            function validatePath(event) {
                var inputPath = event.target;
                if(inputPath.value.indexOf('/') !== 0){
                    inputPath.setCustomValidity('Path must start with "/" ')
                }else{
                    inputPath.setCustomValidity('');
                }
                
            }
            function submitForm() {
                
                try{
                    var app = exports.app;
                    app.showConfirmation('Are you sure you want to Save ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes'){

                            
                            var data = {
                                name: getValue('name'),
                                shortName: getValue('shortName'),
                                description: getValue('description'),
                                path: getValue('path')
                            };
                            
                            var id = getValue('_id'); 
                            fetch('/v1/system_accessibility'+(id?'/'+id:''),{
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
                                if(app.refreshAccessListTable){
                                    app.refreshAccessListTable();
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
                fetch('/v1/system_accessibility/'+id).then(function(result){
                    return result.json();
                }).then(function(access){
                    clearForm();
                    if(access){
                        setValue('name',access.name);
                        setValue('shortName',access.shortName);
                        setValue('description',access.description);
                        setValue('path',access.path);
                        setValue('_id',access._id);    
                    }
                });
            }
            
            exports.app.submitAccessForm = submitForm;
            exports.app.loadAccessForm = loadForm;
            exports.app.clearAccessForm = clearForm;
        })(window);
    </script>
    `
};