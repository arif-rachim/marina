let {fetch} = require('../../../config');

const printMenu = (roles) => {
    return roles.reduce((token,role) => {
        role.accessibility.forEach(accessibility => {
            if(token.key.indexOf(accessibility._id)<0){
                token.items.push(accessibility);
            }
        });
        return token;
    },{key:[],items:[]}).items.map(access => {
        return `<a class="menu-item" href="${access.path}">${access.shortName}</a>`;
    }).join('');
};

module.exports = async(req) => {
    let user = false;
    if(req.cookies.sessionId){
        try{
            user = await fetch(`v1/system_active_sessions?sessionId=${req.cookies.sessionId}`);
            user = user.docs[0];
            if(user){
                let roles = await fetch(`v1/system_roles?$ids=${user.account.roles}`);
                user.account.roles = roles;
                for(let i = 0;i<roles.length;i++){
                    let role = roles[i];
                    let accessibility = await fetch(`v1/system_accessibility?$ids=${role.accessibility}`);
                    role.accessibility = accessibility;
                }
            }
        }catch(err){
            console.error(err);
        }
    }

    return `
<style>
    .menu {
        border-top:2px solid black;
        border-bottom:1px solid #cccccc;
        display: flex;
        justify-content: flex-end;
    }
    .menu .menu-item{
        display: inline-block;
        padding: 0.3em 0.5em;
        text-decoration: none;
        color: #333;
    }
    .login-form{
        margin: 0px;
        padding:0px;
    }
    .login-form input{
        padding:0.3em;
    }
    
    .login-form .form-item{
        padding:0.3em 0.3em;
        display: flex;
        flex-direction: column;
    }
    .login-form .form-item label{
        font-size: 14px;
    }
    .login-slider{
        position: relative;
        padding:0.3em;
        border-top : none;
        background-color: #eee;
        top:0px;
        transition: top 300ms;
        border: 1px solid #CCC;
        border-top : none;
    }
    .login-slider.hide {
        top : -200px;
    }
    .login-panel{
        position: relative;
        display: flex;
        justify-content: center;
        height : 0px;
        overflow: hidden;
    }
    
</style>
<div class="menu">
    <div style="width: 100%" class="menu-holder">
        ${user ? printMenu(user.account.roles) : ''}
    </div>
    <div>
        <a href="#" class="menu-item login-logout">
            ${user ? user.account.name : 'Login'}
        </a>
    </div>
</div>
<div style="position: relative;width: 100%">
<div style="position: absolute;width: 100%">
<div class="login-panel">
    <div class="login-slider hide">
        <form class="login-form" onsubmit="return false;git ">
            <div class="form-item">
                <label for="userName">User Id:</label>
                <input id="userName" placeholder="Email or User ID">
            </div>
            <div class="form-item">
                <label for="password" >Password:</label>
                <input id="password" type="password" placeholder="Password">
            </div>
            <div class="form-item" style="display: flex;justify-content: flex-end;padding:0.5em 0.3em">
                <div style="display: flex;justify-content: flex-end">
                    <button style="margin-right: 0.5em;" class="login-button">Login</button>
                    <button class="cancel-button">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</div>
</div>
</div>
<script>
    (function(exports){
        exports.app = exports.app = {};
        
        var app = exports.app;
        var menuLoginLogout = document.querySelector('.menu-item.login-logout');
        var loginPanel = document.querySelector('.login-panel');
        var slider = document.querySelector('.login-panel .login-slider');
        var loginButton = document.querySelector('.login-panel .login-button');
        var cancelButton = document.querySelector('.login-panel .cancel-button');
        var menuHolder = document.querySelector('.menu .menu-holder');
        
        function populateRolesOnUser(user){
            fetch('/v1/system_roles?$ids='+user.account.roles)
            .then(function(result){
                return result.json();
            })
            .then(function(roles){
                if(roles.errorMessage){
                    app.showNotification(roles.errorMessage);
                    return;
                }
                user.account.roles = roles;
                return Promise.all(roles.map(function(role){
                    return fetch('/v1/system_accessibility?$ids='+role.accessibility);
                }));
            })
            .then(function(results){
                return Promise.all(results.map(function(result){
                    return result.json();
                }));
            })
            .then(function(accessibilities){
                accessibilities.forEach(function(accessibility,index){
                    user.account.roles[index].accessibility = accessibility;
                });
                return user;
            })
            .then(function(user){
                updateMenus();
            });
        };
        
        function loadCurrentUser(){
            fetch('/svc/security.get-current-user',{
                method : 'POST',
                credentials : 'same-origin',
                headers : {
                    'content-type' : 'application/json'
                },
                body : ''
            }).then(function(response){
                return response.json();
            }).then(function(data){
                if(data && data.account){
                    app.user = data;
                    populateRolesOnUser(app.user);
                }
            });
        }
        setTimeout(loadCurrentUser,100);
        
        /**
        * We should call server in next release 
        */
        function getUserMenus() {
            if(app.user){
                return app.user.account.roles.reduce(function(token,role){
                    var accessibilities = role.accessibility;
                    for(var i = 0;i<accessibilities.length;i++){
                        var access = accessibilities[i];
                        if(token.key.indexOf(access._id)<0){
                            token.key.push(access._id);
                            token.items.push(access);
                        }
                    }
                    return token;
                },{key:[],items:[]}).items;
            }
            return [];
        }
        
        
        function updateMenus(){
            var menus = getUserMenus();
            menuHolder.innerHTML = menus.map(function(menuItem){
                return '<a class="menu-item" href="'+menuItem.path+'">'+menuItem.shortName+'</a>';
            }).join('');
            menuLoginLogout.innerHTML = app.user ? app.user.account.name : 'Login';
        }
        
        
        function onLoginLogut(event) {
            if(app.user){
                app.showConfirmation('Are you sure you wish to logout ? ',['Yes','No'],function(button){
                    if(button.innerText === 'Yes'){
                        fetch('/svc/security.logout',{
                            method:'POST',
                            headers: {
                                'content-type' : 'application/json'
                            },
                            credentials : 'same-origin'
                        }).then(function(result){
                            return result.json();
                        }).then(function(user){
                            app.showNotification('Successfully logged out');
                            delete app.user;
                            updateMenus();
                            location.href = '/index.html'
                        });
                    }
                })
            }else{
                loginPanel.style.height = 'auto';
                slider.classList.remove('hide');    
            }
        }
        
        function getValue(id){
            return document.getElementById(id).value;
        }
        function loginToServer() {
            var data = {
                userName: getValue('userName'),
                password: getValue('password')
            };
            fetch('/svc/security.login',{
                method:'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                credentials : 'same-origin',
                body : JSON.stringify(data)
            })
            .then(function(result){
                return result.json();
            })
            .then(function(user){
                if(user.errorMessage){
                    app.showNotification(user.errorMessage);
                    return;
                }
                app.user = user;
                populateRolesOnUser(app.user);
                app.showNotification('Successfully logged in as '+user.account.name);
            });
            
        }
        
        loginButton.addEventListener('click',function(event){
            slider.classList.add('hide');
            loginToServer();
            setTimeout(function(){
                loginPanel.style.height = '0px';
            },300)
        });
        
        cancelButton.addEventListener('click',function(event){
            slider.classList.add('hide');
            setTimeout(function(){
                loginPanel.style.height = '0px';
            },300)
        });
        
        menuLoginLogout.addEventListener('click',onLoginLogut)
    })(window);
</script>
`;
};