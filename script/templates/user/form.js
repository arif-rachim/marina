const { fetch } = require('../../../config');

const printRolesSelection = async (req) => {
    const response = await fetch('/v1/system_roles');
    const roles = response.docs;
    return roles.map(role => `
        <label style="display:flex;align-items:center">
            <input type="checkbox" name="${role.code}" id="${role._id}" data-role-id="${role._id}" data-type="role" style="margin-top: 0.2em"> : ${role.name}
        </label>
    `).join('');
}
module.exports = (req) => {
    return `
        <style>
            .user-form {
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                align-items: flex-end;
            }
            .user-form input[type="text"], 
            .user-form input[type="email"], 
            .user-form input[type="tel"], 
            .user-form input[type="password"]{
                padding: 0.3em;
                width: 100%;
            }
            .user-form label{
                display: block;
            }
            .user-form div {
                padding:0.3em;
                width: 50%;
                box-sizing: border-box;
            }
            .user-form div.name{
                width: 100%;
            }
            @media screen and (max-width: 430px){
                .user-form div {
                    width: 100%;
                }
            }
            
        </style>
        <form class="user-form" onsubmit="return false;">
        <input type="hidden" name="_id" id="_id">
        <div>
            <label for="userId">User ID :</label>
            <input type="text" name="UserID" id="userId" required class="form-control" placeholder="Enter userid">
        </div>
        <div>
            <label for="password">Password :</label>
            <input type="password" name="Password" id="userPassword" required class="form-control" placeholder="Enter password">
        </div>
        <div class="name">
            <label for="name"> Full Name :</label>
            <input type="text" name="Name" id="name" required class="form-control" placeholder="John Q. Public">
        </div>
        <div>
            <label for="email">Email :</label>
            <input type="email" name="Email" id="email" required class="form-control" placeholder="john.public@gmail.com">
        </div>
        <div>
            <label for="phone">Phone :</label>
            <input type="tel" name="Phone" id="phone" required class="form-control" placeholder="050.123.4567">
        </div>
        <fieldset style="padding-left: 0.3em;">
            <legend style="font-size:1.2em">Roles :</legend>
            ${req.print(printRolesSelection(req))}
            </fieldset>
        <div style="width: 100%">
            <input type="submit" style="width: auto;" value="Save" class="btn btn-primary">
            <input type="reset" style="width: auto;margin-left:0.5em" class="btn">
        </div>
    </form>
    
    <script>
        (function(exports){
            exports.app = exports.app || {};
            
            document.querySelector('.user-form input[type="reset"]').addEventListener('click',clearForm);
            document.querySelector('.user-form').addEventListener('submit',submitForm);
            document.querySelector('[name="Phone"]').addEventListener('keyup',maskPhone);
            document.querySelector('[name="UserID"]').addEventListener('keyup',maskUserId);
            document.querySelector('[name="Name"]').addEventListener('keyup',maskName);
            var catalog = {};

            function loadAllRoles(){
                fetch('/v1/system_roles').then(function(response) {
                    return response.json();
                }).then(function(data){
                    catalog.roles = data.docs;
                });
            }
            loadAllRoles();
            
            function maskPhone(event) {
                var phone = event.target.value;
                event.target.value = phone.split('.').join('').split('').reduce(function(result,number,index){
                    if(parseInt(number) >= 0){
                        if(index === 3 || index == 6){
                            return result +'.'+number; 
                        }
                        return result+number;
                        }
                    return result;
                },'');                
            }
            
            var allowedCharacterForUserId = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            allowedCharacterForUserId = allowedCharacterForUserId.concat(['1','2','3','4','5','6','7','8','9','0','.','_','-']);
            
            function maskUserId(event) {
                var userId = event.target.value;
                event.target.value = userId.toLowerCase().split('').reduce(function(result,character){
                    if(allowedCharacterForUserId.indexOf(character) >=0){
                        return result+character;    
                    }
                    return result;
                },'');        
            }
            
            function maskName(event){
                var name = event.target.value;
                event.target.value = name.split('').reduce(function(result,character,index){
                    result.name = (result.name+ (result.nextLeterCapital ? character.toUpperCase() : character));
                    result.nextLeterCapital = character === ' ';
                    return result;
                },{
                    name : '',
                    nextLeterCapital:true
                }).name;
            }
            
            function stringToBase64(str) {
                try{
                    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                        function toSolidBytes(match, p1) {
                            return String.fromCharCode('0x' + p1);
                    }));
                }catch(err){
                    console.error(err);
                }
                return '';
            };
            
            function base64ToString(str) {
                try{
                    return decodeURIComponent(atob(str).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                }catch(err){
                    console.error(err);
                }
                return '';
            }
            
            var catalog = {};

            function loadAllRoles(){
                fetch('/v1/system_roles').then(function(response) {
                    return response.json();
                }).then(function(data){
                    catalog.roles = data.docs;
                });
            }
            loadAllRoles();

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
                setValue('userId','');
                setValue('email','');
                setValue('phone','');
                setValue('userPassword','');
                document.querySelectorAll('[data-type="role"]').forEach(function(node){
                    setSelected(node.id,false);
                });
                setValue('_id','');
            }

            function formIsValid() {
                var nodeList = document.querySelectorAll('input[type="text"] , input[type="password"] , input[type="email"] , input[type="tel"]');
                return [].slice.call(nodeList).reduce(function(allValid,node){
                    return allValid && node.checkValidity();
                },true);   
            }
            
            function submitForm() {
                try{
                    var app = exports.app;
                    if(!formIsValid()){
                        return false;
                    }
                   app.showConfirmation('Are you sure you want to Save ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes'){
                            var selectedRoles = [];
                            document.querySelectorAll('[data-type="role"]').forEach(function(node){
                                if(node.checked){
                                    selectedRoles.push(node.id);
                                }
                            });
                            var password = getValue('userPassword');
                            var data = {
                                name: getValue('name'),
                                userId: getValue('userId'),
                                email: getValue('email'),
                                phone: getValue('phone'),
                                password: stringToBase64(getValue('userPassword')),
                                roles : selectedRoles
                            };
                          var id = getValue('_id');
                          var isNewRegisteredUser = id ? false : true;
                          app.fetch('/v1/system_users'+(id?'/'+id:''),data,id ? 'PUT':'POST').then(function(data){
                              if(app.showNotification){
                                app.showNotification('Data saved successfully');    
                              }
                              if(app.refreshUserListTable){
                                  app.refreshUserListTable();
                              }
                              clearForm();
                          }).then(function(){
                              if(isNewRegisteredUser){
                                app.fetch('/svc/system.welcome-message',{
                                  to : data.email,
                                  name : data.name,
                                  userId : data.userId,
                                  password : password 
                                },'POST')    
                              }
                          });
                       }
                   });
                  
              }catch(err){
                  console.error(err);
              }
            }
            
            function loadForm(id){
                fetch('/v1/system_users/'+id).then(function(result){
                    return result.json();
                }).then(function(user){
                    clearForm();
                    if(user){
                        setValue('name',user.name);
                        setValue('userId',user.userId);
                        setValue('email',user.email);
                        setValue('phone',user.phone);
                        setValue('userPassword',base64ToString(user.password));
                        setValue('_id',user._id);    
                        if(user.roles){
                            user.roles.forEach(function(role){
                                setSelected(role,true);
                            });
                        }
                    }
                });
            }
            exports.app.submitUserForm = submitForm;
            exports.app.loadUserForm = loadForm;
            exports.app.clearUserForm = clearForm;
        })(window);
    </script>
    `
};