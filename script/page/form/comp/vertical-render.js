const {guid} = require('../../../common/utils');
const render = (model,data) => {
    model = model || {slot:'',hasDropDown:true};
    const uid = guid();
    return `<div id="${uid}" class="container-panel vertical" draggable="true" is="page.form.comp.vertical" > 
            <div class="container-panel-item vertical">${model.hasDropDown? '<div class="dropdown-target-marker hide"></div>':''}${model.slot}</div>
        </div>`
};

module.exports = {render};