let {fetch} = require('../../../config');

const printMenu = (roles) => {
    return roles.reduce((token,role) => {
        if(role) {
            role.accessibility.forEach(accessibility => {
                if (accessibility && accessibility._id && (token.key.indexOf(accessibility._id) < 0)) {
                    token.items.push(accessibility);
                }
            });
        }
        return token;
    },{key:[],items:[]}).items.map(access => {
        return `<a class="menu-item" href="${access.path}" style="text-decoration: none;">${access.shortName}</a>`;
    }).join('');
};

module.exports = async(req) => {
    let user = false;
    if(req.cookies.sessionId){
        try{
            user = await fetch(`/res/system_active_sessions?sessionId=${req.cookies.sessionId}`);
            user = user.docs[0];
            if(user){
                let roles = await fetch(`/res/system_roles?$ids=${user.account.roles}`);
                user.account.roles = roles;
                for(let i = 0;i<roles.length;i++){
                    let role = roles[i];
                    if(role){
                        let accessibility = await fetch(`/res/system_accessibility?$ids=${role.accessibility}`);
                        role.accessibility = accessibility;
                    }
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
        padding:0.5em;
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
        padding:0.5em;
        padding-top:0;
        top:0px;
        transition: top 300ms ease-out;
        
        border-top : none;
        
    }
    .login-slider.hide {
        top : -300px;
    }
    .login-panel{
        position: relative;
        display: flex;
        justify-content: center;
        height : 0px;
        overflow: hidden;
    }
    
    .greeting-label{
        background: #FFFFFF;
        width: 1px;
        opacity: 1;
        padding-left : 0.5em;
        margin-right: -0.5em;
        transition: all 1s;
    }
    
    
    
    .greeting-label.hide{
        opacity: 0;
    }
    
    
    .menu-vertical-container {
        display: block;
        width: 100%;
        position: relative;
        overflow: hidden;
        height : 0px;
    }
    
    .menu-vertical {
        
        border-bottom: 1px solid #cccccc;
        width: 100%;
        padding-left: 0.5em;
        padding-right: 0.5em;
        top:0px;
        transition: top 300ms ease-out;
        background: rgba(252,252,252,1);
        background: -moz-linear-gradient(top, rgba(252,252,252,1) 0%, rgba(250,250,250,1) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(252,252,252,1)), color-stop(100%, rgba(250,250,250,1)));
        background: -webkit-linear-gradient(top, rgba(252,252,252,1) 0%, rgba(250,250,250,1) 100%);
        background: -o-linear-gradient(top, rgba(252,252,252,1) 0%, rgba(250,250,250,1) 100%);
        background: -ms-linear-gradient(top, rgba(252,252,252,1) 0%, rgba(250,250,250,1) 100%);
        background: linear-gradient(to bottom, rgba(252,252,252,1) 0%, rgba(250,250,250,1) 100%);
    }
    
    .menu-vertical-content{
        display: flex;
        flex-direction: column;
    }
    
    .menu-vertical a {
        padding: 0.5em;
        color: #333333;
    }
    
    .menu-vertical .menu-item {
        font-size: medium;
    }
    
    .menu-toggle-button{
        display: none;
        position: absolute;
        top: 1em; 
        right: 1em;
    }
    
    .menu-vertical.hide{
        top : -200px;
    }
    
    .menu-holder {
        display: flex;
        justify-content: flex-start;
    }
    
    @media screen and (max-width: 570px){
        .menu-holder {
            display: none;
        }
        .menu-toggle-button{
            display: block;
        }
    }
    
</style>
<div class="menu">
    <div style="display: flex;align-items: center;margin-left:0.5em">
        <a href="/index.html" style="color: #333;">
            <i class="fas fa-home" style="font-size: 1.1em;" ></i>
        </a>
        <a href="/page/cetc.articles.list-public" style="color: #333;margin-left: 0.5em;margin-right: 0.5em;text-decoration: none" >
            Articles
        </a>
    </div>
    <div style="width: 100%" >
        <div class="menu-holder">
            ${user ? printMenu(user.account.roles) : ''}
        </div>
    </div>
    
    <div style="white-space: nowrap;position: relative">
        <span class="greeting-label hide" ></span>
        <a href="#" class="menu-item login-logout" >
            ${user ? user.account.name : 'Login'}
        </a>
    </div>
</div>

<div style="position: fixed;width: 100%;top: 0px;left:0px;z-index: 2">
    <div style="position: absolute;width: 100%;">
        <div class="menu-vertical-container " >
            <div class="menu-vertical shadow p-3 mb-5 bg-white hide" style="position: relative;padding-top:1em;padding-bottom: 1em;">
                <div style="float:right;" class="close">
                    <i class="far fa-times-circle" style="font-size: 1.2em"></i>
                </div>
                <div class="menu-vertical-content" style="min-height: 100px">
                    ${user ? printMenu(user.account.roles) : ''}
                </div>
            </div>
        </div>
    </div>
</div>
<div style="position: relative;width: 100%">
    <div style="position: absolute;width: 100%;z-index:1">
        <div class="login-panel">
            <div class="login-slider hide">
                <div class="border-left border-right border-bottom shadow p-3 mb-5" style="padding: 1em;
                background: rgb(242,242,242); /* Old browsers */
                background: -moz-linear-gradient(top, rgba(242,242,242,1) 0%, rgba(234,234,234,1) 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(top, rgba(242,242,242,1) 0%,rgba(234,234,234,1) 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to bottom, rgba(242,242,242,1) 0%,rgba(234,234,234,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                ">
                    <form class="login-form" onsubmit="return false;" style="width: 300px">
                        <div class="form-item">
                            <label for="userName" >User Id:</label>
                            <input id="userName" placeholder="User ID" class="form-control">
                        </div>
                        <div class="form-item">
                            <label for="password" >Password:</label>
                            <input id="password" type="password" placeholder="Password" class="form-control">
                        </div>
                        <div class="form-item" style="display: flex;justify-content: flex-end;padding:0.5em 0.3em">
                            <div style="display: flex;justify-content: flex-end">
                                <button style="margin-right: 0.5em;" class="btn btn-primary login-button">Login</button>
                                <button class="btn cancel-button">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="menu-toggle-button">
    <i class="fas fa-bars" style="font-size: 1.5em"></i>
</div>
<script>
    (function(exports){
        exports.app = exports.app || {};
        
        var app = exports.app;
        var menuLoginLogout = document.querySelector('.menu-item.login-logout');
        var loginPanel = document.querySelector('.login-panel');
        var slider = document.querySelector('.login-panel .login-slider');
        var loginButton = document.querySelector('.login-panel .login-button');
        var cancelButton = document.querySelector('.login-panel .cancel-button');
        var menuHolder = document.querySelector('.menu .menu-holder');
        var greetingLabel = document.querySelector('.greeting-label');
        var menuVertical = document.querySelector('.menu-vertical');
        var menuVerticalContainer = document.querySelector('.menu-vertical-container');
        document.querySelector('.menu-vertical-container .close').addEventListener('click',toggleMenu);
        document.querySelector('.menu-toggle-button').addEventListener('click',toggleMenu);
        
        function toggleMenu(event){
            
            if(menuVertical.classList.contains('hide')){
                menuVerticalContainer.style.height = 'auto';
                menuVertical.classList.remove('hide');
            }else{
                menuVertical.classList.add('hide');
                setTimeout(function(){
                    menuVerticalContainer.style.height = '1px';    
                },300);
                
            }
        }
        
        function showGreetings() {
            var curHr = new Date().getHours();
            
            if (curHr < 12) {
                greetingLabel.innerText = 'Good morning';
            } else if (curHr < 18) {
                greetingLabel.innerText = 'Good afternoon';
            } else {
                greetingLabel.innerText = 'Good evening';
            }
            greetingLabel.style.width = 'auto';
            greetingLabel.classList.remove('hide');
            
        }
        
        function populateRolesOnUser(user){
            fetch('/res/system_roles?$ids='+user.account.roles)
            .then(function(result){
                return result.json();
            })
            .then(function(roles){
                if(roles.errorMessage){
                    app.showNotification(roles.errorMessage);
                    return;
                }
                roles = roles.filter(function(role){return role !== null});
                user.account.roles = roles;
                return Promise.all(roles.map(function(role){
                    return fetch('/res/system_accessibility?$ids='+role.accessibility);
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
            app.fetch('/svc/security.get-current-user',{},'post',false).then(function(data){
                if(data && data.account){
                    app.user = data;
                    populateRolesOnUser(app.user);
                }
            });
        }
        
        setTimeout(loadCurrentUser,1000);
        
        /**
        * We should call server in next release 
        */
        function getUserMenus() {
            if(app.user){
                return app.user.account.roles.reduce(function(token,role){
                    var accessibilities = role.accessibility;
                    for(var i = 0;i<accessibilities.length;i++){
                        var access = accessibilities[i];
                        if(access && access._id && token.key.indexOf(access._id)<0){
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
            if(menuLoginLogout.innerText == 'Login' && app.user){
                window.scrollTo(0,0);
                app.showNotification('Successfully logged in as '+app.user.account.name);
                showGreetings();
            }
            menuHolder.innerHTML = menus.map(function(menuItem){
                return '<a class="menu-item" href="'+menuItem.path+'">'+menuItem.shortName+'</a>';
            }).join('');
            document.querySelector('.menu-vertical-content').innerHTML = menus.map(function(menuItem){
                return '<a class="menu-item" href="'+menuItem.path+'" style="text-decoration: none;">'+menuItem.shortName+'</a>';
            }).join('');
            
            menuLoginLogout.innerHTML = app.user ? app.user.account.name : 'Login';
        }
        
        
        function onLoginLogut(event) {
            if(app.user){
                app.showConfirmation('Are you sure you wish to logout ? ',['Yes','No'],function(button){
                    if(button.innerText === 'Yes'){
                        app.fetch('/svc/security.logout',{}).then(function(user){
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
            app.fetch('/svc/security.login',data,'post',true).then(function(user){
                if(user.errorMessage){
                    app.showNotification(user.errorMessage);
                    return;
                }
                app.user = user;
                populateRolesOnUser(app.user);
                
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