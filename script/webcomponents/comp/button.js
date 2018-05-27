class Button extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode:'open'}).innerHTML = `
        <button id="button">${this.getAttribute('label')}</button>
        `;
    }

    static get observedAttributes(){
        return ['label'];
    }

    attributeChangedCallback(name,oldVal,newVal){
        if(name == 'label'){
            this.shadowRoot.getElementById('button').innerHTML = newVal;
        }
    }

}

export default Button;