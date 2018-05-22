const renderTag = (tag) => `<li style="padding: 0.8em;border-left: 1px solid #F0F0F0;border-right: 1px solid #F0F0F0;border-bottom: 1px solid #EEE"><a href="#" style="text-decoration:none; color: black">${tag}</a></li>`

module.exports = (tags) => {
    return `
    <menu style="border-top: 2px solid #333; border-bottom: 1px solid #CCC;display:flex">
        <ul style="width: 100%; display: flex; justify-content: center;flex-wrap: wrap;">
            <li style="padding: 0.8em;">Home</li>
            <li style="padding: 0.8em;position:relative;" 
                onmouseover="document.getElementById('menuNews').style.display = 'block'"
                onmouseleave="document.getElementById('menuNews').style.display = 'none'"
                >News Source<i class="fas fa-chevron-down" style="font-size: 0.7em;padding-left:0.8em"></i>
                <span id="menuNews" style="position:absolute; background: #FFF;left:0px; top: 100%;box-sizing: border-box;display:none;border-top:1px solid #CCC;width:200px">
                    <!--
                    <ul>
                        ${tags.map(renderTag).join('')}
                    </ul>
                    -->
                </span>
            </li>
            <li style="padding: 0.8em;">Contact</li>
            <li style="padding: 0.8em;">Industry</li>
        </ul>
        
        <style>
            .hide{
                display:none;
            }
            
            .login-suggest.show{
                opacity: 1;
            }
            
            .login-suggest {
                background:#FFF;
                position:absolute;
                top:0px;
                right:0px;
                padding:0.6em;
                opacity : 0;
                transition: opacity 300ms;
                border-left : 1px solid #CCCCCC;
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
            <a href="#" style="text-decoration:none;color:black;" id="loginButton">Login</a>
            <div id="loginSuggest" class="login-suggest hide">
                <form>
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
                        ">Login</button>
                        
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
            </div>
        </span>
    </menu>
    <script>
        document.getElementById("loginButton").addEventListener("click",function(){
            document.getElementById("loginSuggest").classList.remove("hide");
            setTimeout(function(){
                document.getElementById("loginSuggest").classList.add("show");    
                document.getElementById("userName").focus();
            });
        });
        
        document.getElementById("cancelButton").addEventListener("click",function(){
            document.getElementById("loginSuggest").classList.remove("show");
            setTimeout(function(){
                document.getElementById("loginSuggest").classList.add("hide");
            },300);
        });

    </script>
    
    `
};