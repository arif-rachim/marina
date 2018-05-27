class Input extends HTMLElement{
    constructor(){
        super();
        this.inputId = 'input';
        this.attachShadow({mode:'open'}).innerHTML = `
            <style>
                :host {
                    display:flex;
                }
                input {
                    padding : 0.3em;
                    margin-top : 0.5em;
                    margin-bottom : 0.5em;
                    width : 100%;
                }
            </style>
            <input type="${this.getAttribute('type')}" 
            placeholder="${this.getAttribute('placeholder')}" 
            value="${this.getAttribute('value') || ''}" 
            id="${this.inputId}" >
        `;
    }
    connectedCallback(){
        let input = this.shadowRoot.getElementById(this.inputId);
        input.addEventListener('change',this.onChange.bind(this));
    }

    onChange(event){
        this.dispatchEvent(new CustomEvent('valuechange',{detail:event.target.value}));
    }

    static get observedAttributes(){
        return ['type','placeholder','value'];
    }

    attributeChangedCallback(name,oldVal,newVal){
        let input = this.shadowRoot.getElementById(this.inputId);
        input.setAttribute(name,newVal);
    }

}

export default Input;