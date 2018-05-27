
class A extends HTMLElement{

    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.innerHTML = `
        <a id="elementId" style="text-decoration:none;color:black">
            <slot>
        </a>
        `;
    }

    getElement(id){
        return this.shadowRoot.getElementById(id);
    }

    static get observedAttributes() {
        return ['href']; 
    }

    attributeChangedCallback(name, oldValue, newValue){
        const root = this.getElement('elementId');
        root.setAttribute(name,newValue);
    }

}

export default A;