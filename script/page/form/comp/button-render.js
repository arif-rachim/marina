const {guid} = require('../../../common/utils');
const render = (model) => {
    model = model || {
        label:{
            value : 'label'
        },
        id : {
            value : guid()
        }
    }
    return `<div id="${model.id.value}" is="page.form.comp.button" >
            <input type="button" value="${model.label.value}" class="btn btn-primary">
        </div>`
};
module.exports = {render};