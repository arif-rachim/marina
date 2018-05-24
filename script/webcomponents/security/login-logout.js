(function() {
    
    class LoginLogout extends HTMLElement{
        
        constructor(){
            super();
            const shadowRoot = this.attachShadow({mode:'open'});
            this.loginButton = "_"+Math.floor(Math.random()*1000000);
            this.shadowRoot.innerHTML = `
            <style>
                #${this.loginButton} {
                    border:1px solid #CCC;
                    background-color: white;
                    color: #333;
                    padding: 0.5em;
                }
                
            </style>
            <button id="${this.loginButton}" >
                Login
            </button>
            `;
        }
        
        connectedCallback(){
            let loginButton = this.shadowRoot.querySelector(`#${this.loginButton}`);
            loginButton.addEventListener('click',() => alert("Okay"));
        }
    }
    
    const componentName = document.currentScript.getAttribute("component-name");
    if(componentName){
        customElements.define(componentName,LoginLogout);    
    }else{
        throw new Error("Please define attribute 'component-name' in the script link");
    }
})();
