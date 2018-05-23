const renderTag = (tag) => `<li style="padding: 0.8em;border-left: 1px solid #F0F0F0;border-right: 1px solid #F0F0F0;border-bottom: 1px solid #EEE"><a href="#" style="text-decoration:none; color: black">${tag}</a></li>`
const fetch = require('node-fetch');
const panelLogin = () => {
    return `
    <div style="position:absolute;top:100%;height:100px;right:0px;overflow:hidden;">
        <div id="loginSuggest" class="login-suggest hide">
            <form onsubmit="return false;">
                <input type="text" id="userName" style="margin-right:0.5em;padding:0.3em;" placeholder="User Name">
                <input id="password" type="password" style="margin-right:0.5em;padding:0.3em;" placeholder="Password">
                <div style="display:flex;justify-content:flex-end;">
                    <button style="
                    background-color: #1979CA;
                    border: none;
                    color: white;
                    padding: 0.5em;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;                  
                    margin-right:0.5em;
                    "
                    onclick="loginAction()"
                    >Login</button>
                    
                    <button id="cancelButton" style="
                    background-color: #BA3E3E;
                    border: none;
                    color: white;
                    padding: 0.5em;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;                  
                    ">Cancel</button>
                </div>
            </form>
            
            <script>
            
            
            document.getElementById("cancelButton").addEventListener("click",function(){
                document.getElementById("loginSuggest").classList.remove("show");
                setTimeout(function(){
                    document.getElementById("loginSuggest").classList.add("hide");
                },300);
            });
            
            function loginAction(){
                fetch('/svc/security.login', {
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    credentials: 'same-origin',
                	method: 'post',
                	body: JSON.stringify({
                		userName: document.getElementById('userName').value,
                		password: document.getElementById('password').value
                	})})
                	.then(function(res) { 
                        return res.json();
                    }).then(function(res ){
                        location.reload();
                    });
            }
        </script>
        </div>
    </div>
    `
}

const panelLogout = () => {
    return `
    <style>
        .logout-button--hidePanel {
            top : -100px;
        }
        .logout-button--showPanel {
            top : 0px;
        }
        
    </style>
    <div style="position:absolute;top:100%;right:0px;margin:1px solid #CCC;width:100%">
        <div style="position:relative;overflow:hidden">
            <div style="transition: all 300ms;position:relative;width:100%" class="logout-button--hidePanel" id="logoutSuggestButton">        
                <div style="padding:0.5em;background: #FFF;color: #FFF;text-align:center;border:1px solid #CCC">
                    <a href="#" style="text-decoration:none;color:black" onclick="logoutUser()">
                    Logout
                    </a>
                </div>
            </div>
        </div>
    </div>
    <script>
        function logoutUser(){
            fetch('/svc/security.logout',{
                method: 'get',
                credentials: 'same-origin'
            }).then(function(err,res){
                location.reload();
            });
        }
    </script>
    `;
}

module.exports = (tags,currentUser) => {
    return `
    <menu style="border-top: 2px solid #333; border-bottom: 1px solid #CCC;display:flex">
        <ul style="width: 100%; display: flex; justify-content: center;flex-wrap: wrap;">
            <li style="padding: 0.8em;">Home</li>
            <li style="padding: 0.8em;position:relative;" 
                onmouseover="document.getElementById('menuNews').style.display = 'block'"
                onmouseleave="document.getElementById('menuNews').style.display = 'none'"
                >News Source<i class="fas fa-chevron-down" style="font-size: 0.7em;padding-left:0.8em"></i>
                <span id="menuNews" style="position:absolute; background: #FFF;left:0px; top: 100%;box-sizing: border-box;display:none;border-top:1px solid #CCC;width:200px">
                    
                </span>
            </li>
            <li style="padding: 0.8em;">Contact</li>
            <li style="padding: 0.8em;">Industry</li>
        </ul>
        
        <style>
            
                        
            .login-suggest {
                background:#FFF;
                position:relative;
                top:0px;
                right:0px;
                padding:0.6em;
                transition: opacity 300ms;
                border : 1px solid #CCCCCC;
                transition: top 300ms;
            }
            
            .login-suggest.hide {
                top : -100px;
            }
            
            .login-suggest form {
                display:flex;
            }
            @media screen and (max-width:550px){
                .login-suggest {
                    width : calc(100vw - 4em)
                }
                
                .login-suggest input {
                    width : 100%;
                }
            }
        </style>
        
        <span style="
        padding: 0.8em;
        position:relative;
        ">
            <a href="#" style="text-decoration:none;color:black;" id="loginButton">${currentUser ? currentUser.name : 'Login'}</a>
            
            ${currentUser ? panelLogout() : panelLogin()}
        </span>
    </menu>
    <script>
        document.getElementById("loginButton").addEventListener("click",function(){
            if(${currentUser ? 'true' : 'false'}){
                var logoutSuggestButton = document.getElementById("logoutSuggestButton");
                if(logoutSuggestButton.classList.contains("logout-button--hidePanel")){
                    logoutSuggestButton.classList.remove("logout-button--hidePanel");
                    logoutSuggestButton.classList.add("logout-button--showPanel");    
                }else{
                    logoutSuggestButton.classList.remove("logout-button--showPanel");
                    logoutSuggestButton.classList.add("logout-button--hidePanel");                    
                }
                
            }else{
                var loginSuggest = document.getElementById("loginSuggest");
                if(loginSuggest.classList.contains("hide")){
                    loginSuggest.classList.remove("hide");
                    document.getElementById("userName").focus();
                }else{
                    loginSuggest.classList.add("hide");
                }
                
            }
        });
    </script>
    
    `
};