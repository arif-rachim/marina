const {guid} = require('../../../common/utils');

const render = ({resourcePath,selectedResource,dataRenderer,title}) => {
    return `<div id="${guid()}" is="page.form.comp.association-selector" resource-path="${resourcePath}" selected-resource="${selectedResource}">
        <h4>${title}</h4>
        <div class="content"></div>
        <div style="margin-top: 1em">
            <button class="btn btn-primary select">Select</button>
            <button class="btn cancel">Cancel</button>
        </div>
        <code style="display: none">${dataRenderer}</code>
        </div>`
};

module.exports = {render};