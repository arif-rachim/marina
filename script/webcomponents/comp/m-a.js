const getId = () => {
    return `_${Math.round(Math.random()*10000)}`;
}

class A extends HTMLElement{

    constructor(){
        super();
        this.idRoot = getId();
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.innerHTML = `
        <a href id="${this.idRoot}" >
            <slot>
        </a>
        `;
    }
}

export default A;