(function() {
    
    class LoginLogout extends HTMLElement{
        
        constructor(){
            super();
            const shadowRoot = this.attachShadow({mode:'open'});
            this.idHost = "_"+Math.floor(Math.random()*1000000);
            this.idButtonLogin = "_"+Math.floor(Math.random()*1000000);
            this.idFormPanel = "_"+Math.floor(Math.random()*1000000);
            this.shadowRoot.innerHTML = `
            <style>
                #${this.idHost} .form-container {
                    display:flex;
                    flex-direction:column;
                    position:relative;
                    top:0px;
                    left:0px;
                    background : #F0F0F0;
                    border:1px solid #CCCCCC;
                }
                
                #${this.idHost} .form-container.colapse{
                    opacity: 1;
                }
                

                #${this.idHost} .button {
                    border:none;
                    background-color: #4285F4;
                    color: white;
                    padding: 0.5em;
                    transition: all 300ms;
                }
                
                #${this.idHost} .button:hover {
                    background-color: #235DF1;
                }
                
                #${this.idHost} .button:focus {
                    outline : none;
                }
                
                #${this.idHost} .button.cancel {
                    background-color: red;
                }
                
                #${this.idHost} .button.cancel:hover {
                    background-color: #D40000;
                }
                
            </style>
            <div id="${this.idHost}" style="position:relative">
                <div style="position:absolute;top:0px;left:0px;overflow:hidden">
                    <div>
                        <div id="${this.idFormPanel}" class="form-container colapse">
                            <div style="padding:0.3em">
                                <input type="text" style="padding:0.3em" placeholder="User Name">
                            </div>
                            <div style="padding:0.3em">
                                <input type="password" style="padding:0.3em" placeholder="Password" >
                            </div>
                            <div style="padding:0.3em;display:flex;justify-content:flex-end">
                                <div style="width:100%;" >
                                <button class="button cancel" >Cancel</button>
                                </div>
                            </div>
                            <button class="button" id="${this.idButtonLogin}" >Login</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        
        connectedCallback(){
            const loginButton = this.shadowRoot.getElementById(this.idButtonLogin);
            const host = this.shadowRoot.getElementById(this.idHost);
            const formPanel = this.shadowRoot.getElementById(this.idFormPanel);
            
            const loginButtonPosition = loginButton.getBoundingClientRect();
            const hostPosition = host.getBoundingClientRect();
            
//            formPanel.style.top = `${(hostPosition.y - loginButtonPosition.y)}px`;
//            formPanel.style.left = `${(hostPosition.x - loginButtonPosition.x)}px`;
            
            console.log(loginButtonPosition);
            console.log(hostPosition);
        }
    }
    
    const componentName = document.currentScript.getAttribute("component-name");
    if(componentName){
        customElements.define(componentName,LoginLogout);    
    }else{
        throw new Error("Please define attribute 'component-name' in the script link");
    }
})();
