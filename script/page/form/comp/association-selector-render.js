const {guid} = require('../../../common/utils');

const render = ({resourcePath,selectedResource,dataRenderer,title}) => {
    return Promise.resolve(`<div id="${guid()}" is="page.form.comp.association-selector" resource-path="${resourcePath}" selected-resource="${selectedResource}">
        <h4>${title}</h4>
        <div class="content" style="display: flex;flex-wrap: wrap;"></div>
        <div class="mt-1" >
            <button class="btn btn-primary select">Select</button>
            <button class="btn cancel">Cancel</button>
        </div>
        <code style="display: none">${dataRenderer}</code>
        </div>`);
};

module.exports = {render};