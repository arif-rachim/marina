import a from '../comp/a.js';
import fetchApi from '../comp/fetchApi.js';
import Button from '../comp/button.js';
import Input from '../comp/input.js';

customElements.define('c-a',a);
customElements.define('c-button',Button);
customElements.define('c-input',Input);

class Login extends HTMLElement{
    
    constructor(){
        super();
        const shadowRoot = this.createShadowRoot({mode:'open'});
        this.idInputUserName = 'userName';
        this.idInputPassword = 'password';
        this.idButtonSubmit = 'submit';
        this.model = {};
        shadowRoot.innerHTML = `
            <style>
                input {
                    padding : 0.3em;
                }
            </style>
            <span>
                <c-a href="#" >Login</c-a>
                <div style="border:1px solid #666;padding:1em;max-width:300px;">
                    <h1>Login</h1>
                    <form style="display:flex;flex-direction:column;">
                        <c-input type="text" placeholder="User Name" id="${this.idInputUserName}" ></c-input>
                        <c-input type="password" placeholder="Password" id="${this.idInputPassword}" ></c-input>
                        <div style="margin-top:0.5em">
                            <c-button style="float:right" label="Submit" id="${this.idButtonSubmit}"></c-button>
                        </div>
                    </form>
                </div>
            </span>
        `;
    }
    connectedCallback(){
        let userName = this.shadowRoot.getElementById(this.idInputUserName);
        let password = this.shadowRoot.getElementById(this.idInputUserName);
        let buttonSubmit = this.shadowRoot.getElementById(this.idButtonSubmit);
        userName.addEventListener('valuechange',(event) => {
            this.model.userName = event.detail;
        });
        password.addEventListener('valuechange',(event) => {
            this.model.password = event.detail;
        });
        buttonSubmit.addEventListener('click',()=> {
            // lets perform login here
        });
    }

    clickMe(event){
        debugger;
        alert('Hello World');
    }
    
    attributeChangedCallback(){

    }

}
export default Login;