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
            <label style="display: flex;align-items: center">
                <input type="checkbox" id="usersManagement">: Users Management 
            </label>
            <label style="display: flex;align-items: center">
                <input type="checkbox" id="rolesManagement">: Roles Management 
            </label>
            <label style="display: flex;align-items: center">
                <input type="checkbox" id="articlesManagement">: Articles Management 
            </label>
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
                setSelected('usersManagement',false);
                setSelected('rolesManagement',false);
                setSelected('articlesManagement',false);
                setValue('_id','');
            }
            
            function submitForm() {
                try{
                    var app = exports.app;
                    
                    app.showConfirmation('Are you sure you want to Save ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes'){
                            var accessibilities = [];
                            if(getSelected('usersManagement')){
                                accessibilities.push({name:'Users Management',code:'USERS_MANAGEMENT',path:'/page/user.page'});   
                            }
                            if(getSelected('rolesManagement')){
                                accessibilities.push({name:'Roles Management',code:'ROLES_MANAGEMENT',path:'/page/role.page'});    
                            }
                            if(getSelected('articlesManagement')){
                                accessibilities.push({name:'Articles Management',code:'ARTICLES_MANAGEMENT',path:'/page/article.page'});    
                            }
                            
                            var data = {
                                name: getValue('name'),
                                accessibility: accessibilities
                            };
                            var id = getValue('_id'); 
                            fetch('/v1/roles'+(id?'/'+id:''),{
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
                fetch('/v1/roles/'+id).then(function(result){
                    return result.json();
                }).then(function(role){
                    if(role){
                        setValue('name',role.name);
                        setSelected('usersManagement',hasRole(role.accessibility,'USERS_MANAGEMENT'));
                        setSelected('rolesManagement',hasRole(role.accessibility,'ROLES_MANAGEMENT'));
                        setSelected('articlesManagement',hasRole(role.accessibility,'ARTICLES_MANAGEMENT'));
                        //setValue('accessibility',role.accessibility);
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