const {guid} = require('../../../common/utils');
const render = (model,data) => {
    model = model || {
        label:{
            value : 'label'
        },
        id : {
            value : guid()
        }
    };
    // nothing we need to do with data here
    return `<div id="${model.id.value}" is="page.form.comp.button" >
            <input type="submit" value="${model.label.value}" class="btn btn-primary">
        </div>`
};
module.exports = {render};