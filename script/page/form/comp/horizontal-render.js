const {guid} = require('../../../common/utils');
const render = (model) => {
    model = model || {slot:''};
    const uid = guid();
    return `<div id="${uid}" class="container-panel horizontal" draggable="true" is="page.form.comp.horizontal" > 
            <div class="container-panel-item horizontal">
                <div class="dropdown-target-marker hide"></div>
                ${model.slot}
            </div>
        </div>`
}
module.exports = {render};