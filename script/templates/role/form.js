const { fetch } = require('../../../config');

const printAccessibilitySelection = async (req) => {
    const response = await fetch('/v1/system_accessibility');
    const accessibilities = response.docs;
    return accessibilities.map(access => `
        <label style="display:flex;align-items:center">
            <input type="checkbox" name="${access.code}" id="${access.code}" data-access-id="${access._id}" data-type="access"> : ${access.name}
        </label>
    `).join('');
}

module.exports = (req) => {
    return `
        <style>
            .role-form {
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                align-items: flex-end;
                font-size:11px;
            }
            .role-form input[type="text"]{
                padding: 0.3em;
                width: 100%;
            }
            
            .role-form label{
                display: block;
            }
            .role-form div {
                padding:0.3em;
                width: 100%;
                box-sizing: border-box;
            }
            
            @media screen and (max-width: 430px){
                .role-form div {
                    width: 100%;
                }
            }
            
        </style>
        <form class="role-form" onsubmit="return false;">
        <input type="hidden" name="_id" id="_id">
        <div >
            <label for="name"> Name :</label>
            <input type="text" name="Name" id="name">
        </div>
        
        <fieldset style="font-size: 13px">
            <legend>Accessibility</legend>
            ${req.print(printAccessibilitySelection(req))}
        </fieldset>
        
        <div style="width: 100%">
            <input type="submit" style="width: auto;" value="Save">
            <input type="reset" style="width: auto;" >
        </div>
    </form>
    <script>
        (function(exports){
            exports.app = exports.app || {};
            
            document.querySelector('.role-form input[type="submit"]').addEventListener('click',submitForm);
            document.querySelector('.role-form input[type="reset"]').addEventListener('click',clearForm);
            var catalog = {};

            function loadAllAccessibility(){
                fetch('/v1/system_accessibility').then(function(response) {
                    return response.json();
                }).then(function(data){
                    catalog.accessibility = data.docs;
                });
            }
            loadAllAccessibility();

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
                document.getElementById(id).checked = value;
            }
            
            function clearForm() {
                setValue('name','');
                document.querySelectorAll('[data-type="access"]').forEach(function(node){
                    setSelected(node.id,false);
                });
                setValue('_id','');
            }
            
            function submitForm() {
                try{
                    var app = exports.app;
                    app.showConfirmation('Are you sure you want to Save ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes'){

                            var selectedAccess = [];
                            document.querySelectorAll('[data-type="access"]').forEach(function(node){
                                if(node.checked){
                                    selectedAccess.push(node.id);
                                }
                            })

                            var data = {
                                name: getValue('name'),
                                accessibility: catalog.accessibility.filter(function(access){
                                    return selectedAccess.indexOf(access.code) >= 0;
                                })
                            };
                            debugger;
                            var id = getValue('_id'); 
                            fetch('/v1/system_roles'+(id?'/'+id:''),{
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
                                if(app.refreshRoleListTable){
                                    app.refreshRoleListTable();
                                }
                              clearForm();
                            });
                       }
                    });
                  
                }catch(err){
                  console.error(err);
                }
              return false;
            }
            
            function hasRole(accessibility, code) {
                return accessibility.map(accessibility => accessibility.code).indexOf(code) >= 0;
            }
            function loadForm(id){
                fetch('/v1/system_roles/'+id).then(function(result){
                    return result.json();
                }).then(function(role){
                    clearForm();
                    if(role){
                        setValue('name',role.name);
                        if(role.accessibility){
                            role.accessibility.forEach(function(access){
                                setSelected(access.code,true);
                            });
                        }
                        setValue('_id',role._id);    
                    }
                });
            }
            exports.app.submitRoleForm = submitForm;
            exports.app.loadRoleForm = loadForm;
            exports.app.clearRoleForm = clearForm;
        })(window);
    </script>
    `
};