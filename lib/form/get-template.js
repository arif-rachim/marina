const template = require('./../template/mdl-plain.js');

const render = (attributes) => {
    return attributes.map(attribute => {
        if(attribute.type == 'boolean'){
            return `
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${attribute.name}">
                <input type="checkbox" id="${attribute.name}" class="mdl-checkbox__input">
                <span class="mdl-checkbox__label">${attribute.label}</span>
            </label>
            `;
        }
        if(attribute.type == 'number'){
            return `
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%">
                <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\\.[0-9]+)?" id="${attribute.name}">
                <label class="mdl-textfield__label" for="${attribute.name}">${attribute.label}</label>
                <span class="mdl-textfield__error">Input is not a number!</span>
            </div>
            `;
        }

        return `
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%">
                <input class="mdl-textfield__input" type="text" id="${attribute.name}" name="${attribute.name}">
                <label class="mdl-textfield__label" for="${attribute.name}">${attribute.label}</label>
            </div>
        `;
    }).join(' ');
}

const content = ({resource,attributes}) => `
<form>
    ${render(attributes)}
</form>
`;

module.exports = ({resource,attributes}) => template({title:`Update ${resource}`,content : content({resource,attributes})});