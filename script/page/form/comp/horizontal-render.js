const {guid} = require('../../../common/utils');
const render = (model,data) => {
    model = model || {slot:'',hasDropDown:true};
    const uid = guid();
    return `<div id="${uid}" class="container-panel horizontal" is="page.form.comp.horizontal" > 
            <div class="container-panel-item horizontal">${model.hasDropDown? '<div class="dropdown-target-marker hide"></div>':''}${model.slot}</div>
        </div>`
};

module.exports = {render};