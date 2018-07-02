const {guid} = require('../../../common/utils');
const render = (model,data) => {
    model = model || {
        label:{
            value : 'Submit'
        },
        id : {
            value : guid()
        }
    };
    return Promise.resolve(`<div id="${model.id.value}" is="page.form.comp.button" >
            <input type="submit" value="${model.label.value}" class="btn btn-primary">
        </div>`);
};
module.exports = {render};