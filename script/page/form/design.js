const html = require('../../res/html');
const Vertical = require('./comp/vertical-render');
const Horizontal = require('./comp/horizontal-render');
const Button = require('./comp/button-render');
const SingleLineText = require('./comp/single-line-text-render');
const Association = require('./comp/association-render');
const {fetch} = require('../../../config');

const componentMap = {
    'page.form.comp.button': Button,
    'page.form.comp.vertical': Vertical,
    'page.form.comp.horizontal': Horizontal,
    'page.form.comp.single-line-text': SingleLineText,
    'page.form.comp.association': Association,
    'form': {
        render: attribute => {
            return printComponent(attribute);
        }
    }
};

const dropdownTargetMarker = '<div class="dropdown-target-marker hide"></div>';

const BEFORE_REQUEST_VALUE = `/**
* req    : HttpRequest contains request object from user
* data   : JSON Body object
* next   : Function to continue the action to database.
* cancel : Function to cancel the action.
*/
module.exports = function(req,data,next,cancel){
    next(data);
}`;

const AFTER_REQUEST_VALUE = `/**
* req    : HttpRequest contains request object from user
* data   : JSON Body object after returned from database.
* res    : HttpResponse
* cancel : Function to cancel the action.
*/
module.exports = function(req,data,res,cancel){
    res.end(JSON.stringify(data));
}`;

const printComponents = (models) => {
    return Promise.all(models.map(model => printComponent(model)))
        .then(components => components.join(dropdownTargetMarker))
        .then(result => result+dropdownTargetMarker);
};

const printComponent = (model) => {
    const component = componentMap[model.type];
    if (model.children) {
        return printComponents(model.children).then(componentStrings => {
            return component.render({slot: componentStrings});
        });
    }
    if (model.attribute) {
        return component.render(model.attribute);
    }
};
module.exports = async (req) => {
    let model = false;
    if (req.query.id) {
        model = await fetch(`/res/system_forms/${req.query.id}`);
    }

    try {
        return html(req, `
        <script src="/node_modules/ace-builds/src-min/ace.js"></script>
        <script src="/node_modules/ace-builds/src-min/theme-chrome.js"></script>
        <script src="/node_modules/ace-builds/src-min/mode-javascript.js"></script>
        <style>
            .input-item{
                border-radius: 0.5em;
                background-color: #e9ecef;
                border: 1px solid #d3d9df;
                text-align: center;
                padding: 0.2em 0.8em 0.4em 0.8em;
                display: inline-block;
                margin: 0.4em;
            }
            
            .dropdown-target-marker{
                border: 1px dotted cadetblue;
                background-color: #f7f7f7;
                min-height: 1em;
                transition: all 100ms ease-out;
                margin-top:1em;
                margin-bottom:1em;
            }
            
            .horizontal > .dropdown-target-marker {
                width : 2em;
                min-height : 1em;
            }
            
            .vertical > .dropdown-target-marker {
                width : 100%;
                height : 1em
            }
            
            .selected {
                background-color: #F9DD8D;
                padding-left : 0.5em;
                padding-right : 0.5em;
                border-radius: 0.5em;
            }
            
            .hide {
                opacity: 0;
                width: 0 !important;
                height: 0 !important;
                min-height: 0;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
            }
            
            .container-panel {
                width: 100%;
                display: flex;
            }
            
            .container-panel .container-panel-item{
                width: 100%;
                min-height: 1em;
            }
            
            .container-panel-item.vertical{
                display: flex;
                flex-direction: column;
            }
            
            .container-panel-item.horizontal{
                display: flex;
            }
            
            .container-panel-item.horizontal > div[is]{
                margin-right: 0.5em;
                margin-left: 0.5em;
            }
            
            .container-panel-item.horizontal {
                margin-left : -0.5em;
                margin-right : -0.5em;
                width: calc(100% + 1em);
            }
            
            .form-group {
                margin-bottom: 0.2em !important;
            }
            
            .flex-full {
                display: none;
                height: 100%;
                
            }
            .flex-full.visible{
                display: flex;
            }
        </style>
        
        <div style="display: flex;flex-direction: column;height: 100vh">
            <div style="border-bottom: 1px solid #D3D9DF;">
                <div>
                    <input id="formVersion" type="hidden" value="${model.version || ''}" >
                    <input id="formId" type="hidden" value="${model._id || ''}" >
                    <div style="display: flex">
                        <div class="form-group" style="width:100%;margin: 1em;max-width: 250px">
                            <label for="formDatabaseLabel" style="margin-bottom: 0.1em">Form Name </label>
                            <input id="formDatabaseLabel" type="text" placeholder="Form Name" class="form-control" oninput="document.getElementById('formDatabaseName').value =  event.target.value.toLowerCase().split(' ').join('_')" required value="${model.label || ''}">
                            <small>Is the form label name</small>
                        </div>
                        <div class="form-group" style="width:100%;margin: 1em;max-width: 250px;margin-left:0;">
                            <label for="formDatabaseName" style="margin-bottom: 0.1em">Form database code </label>
                            <input id="formDatabaseName" type="text" placeholder="Form Database Code" class="form-control" oninput="document.getElementById('formDatabaseName').value =  event.target.value.toLowerCase().split(' ').join('_')" required value="${model.name || ''}">
                            <small>Is the form resource name</small>
                        </div>
                        <span style="width: 100%"></span>
                        <div style="display: flex;align-items: flex-end;margin: 0.5em" >
                            <button class="btn btn-sm design-button" style="margin-right: 0.5em">Design</button> 
                            <button class="btn btn-sm before-request-button" style="margin-right: 0.5em">Before Request</button>
                            <button class="btn btn-sm after-request-button" >After Request</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- This is the panel for design -->
            <!-- div style="display: flex;height: 100%" -->
            <div class="flex-full design-panel visible" >
                <div style="width: 300px;border-right: 1px solid #d3d9df;display: flex;flex-direction: column;padding: 1em">
                    <div style="height: 100%">
                        <h3 style="font-weight: 100">Tools</h3>
                        <div style="width: 100%">
                            <div class="input-item" draggable="true" data-type="page.form.comp.single-line-text">Single Line Text</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.association">Association</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.number">Number</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.paragraph-text">Paragraph Text</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.checkboxes">Checkboxes</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.multiple-choice">Multiple Choice</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.drop-down">Dropdown</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.multiple-items">Multiple Items</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.section-break">Section Break</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.page-break">Page Break</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.button">Submit Button</div>
                        </div>
                    </div>
                    <div style="height: 100%">
                        <h3 style="font-weight: 100">Container</h3>
                        <div style="width: 100%">
                            <div class="input-item" draggable="true" data-type="page.form.comp.vertical">Vertical</div>
                            <div class="input-item" draggable="true" data-type="page.form.comp.horizontal">Horizontal</div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;background-color: #F5F5F5;padding: 3em;display: flex;justify-content: center;flex-direction: column">
                    
                    <div style="width: 100%;height:100%;background-color: white;border: 1px solid #d3d9df;min-height: 5em;padding: 1em;overflow:auto;display: flex;flex-direction: column" id="form-panel">
                        ${req.print(model ? printComponent(model) : Vertical.render())}                            
                    </div>
                    <div style="margin-top: 1em;">
                        <span style="display: flex;">
                            <span style="width: 100%"></span>
                            <button class="btn btn-primary" id="saveFormButton" style="margin-right: 1em">Create New Version</button>
                            <button class="btn" id="updateFormButton" style="display: ${model && model._id ? 'block' : 'none'}" >Update</button>
                        </span>
                    </div>
                </div>
                <div style="width: 700px;border-left: 1px solid #d3d9df;padding:1em;overflow: auto" is="page.form.comp.properties-panel">
                    <h3 style="font-weight: 100">Properties</h3>
                    <div class="property-details" style="width: 100%">
                    </div>
                    <div>
                        <button class="btn btn-primary btn-delete">Delete</button>
                    </div>
                </div>
            </div>
            <!-- This is the panel for Before Request -->
            <div class="flex-full before-request-panel ">
                <div id="beforeRequestEditor" style="width: 100%;height: 100%;">${model.beforeRequest || BEFORE_REQUEST_VALUE}</div>
            </div>
            <!-- This is the panel for After Request -->
            <div class="flex-full after-request-panel">
                <div id="afterRequestEditor" style="width: 100%">${model.afterRequest || AFTER_REQUEST_VALUE}</div>
            </div>
        </div>
        <script path="${__filename}">
            const {merge} = require('../../common/utils');
            const {publish} = require('../../common/pubsub');
            
            const formPanel = document.querySelector('#form-panel');
            const {fetch} = require('../../common/net');
            
            const Vertical = require('./comp/vertical');
            const Horizontal = require('./comp/horizontal');
            const SingleLineText = require('./comp/single-line-text');
            const Association = require('./comp/association');
            const Button = require('./comp/button');
            
            // here we are setting the editor
            const JavascriptMode = ace.require("ace/mode/javascript").Mode;
            
            const beforeRequestEditor = ace.edit('beforeRequestEditor');
            beforeRequestEditor.setTheme("ace/theme/chrome");
            beforeRequestEditor.session.setMode(new JavascriptMode());
            
            const afterRequestEditor = ace.edit('afterRequestEditor');
            afterRequestEditor.setTheme("ace/theme/chrome");
            afterRequestEditor.session.setMode(new JavascriptMode());
            
            const componentMap = {
                'page.form.comp.button' : Button,
                'page.form.comp.vertical' : Vertical,
                'page.form.comp.horizontal' : Horizontal,
                'page.form.comp.single-line-text' : SingleLineText,
                'page.form.comp.association' : Association
            };
            document.querySelector('#saveFormButton').addEventListener('click',event => {
                publish('app.confirmation',{
                    text : 'Are you sure you want to Save the form ?',
                    buttons : ['Yes','No']
                }).then(function(button){
                    if(button.innerText === 'Yes' ){
                        let model = {};
                        formPanel.childNodes.forEach(node => {
                            if('hasAttribute' in node && node.hasAttribute('is')){
                                const json = node.toJSON();
                                model = merge(model,json);
                            }
                        });
                        const formDatabaseLabel = document.getElementById('formDatabaseLabel');
                        
                        if(formDatabaseLabel.checkValidity()){
                            const resourceName = document.getElementById('formDatabaseName').value;
                            const version = (parseInt(document.getElementById('formVersion').value || '0')+1).toString();
                            fetch('/res/system_forms?$s.version=-1&name=|'+resourceName+'|&$p.version=1&$p.name=1',{},'GET',false)
                            .then(result => {
                                let version = 0;
                                if(result.docs.length > 0){
                                    version = parseInt(result.docs[0].version)+1;
                                }
                                return version;
                            }).then(version => {
                                let form = {
                                    type : 'form',
                                    label : formDatabaseLabel.value,
                                    name : resourceName,
                                    version : version.toString(),
                                    attribute : model,
                                    beforeRequest : beforeRequestEditor.getValue(),
                                    afterRequest : afterRequestEditor.getValue()
                                };
                                return fetch('/res/system_forms',form,'POST')
                            }).then((result) => {
                                if(result.success){
                                    publish('app.notification','Form successfully saved');
                                }else{
                                    publish('app.notification',result.message);
                                }
                            });
                        }
                    }
                });  
            });
            
            document.querySelector('#updateFormButton').addEventListener('click',event => {
                publish('app.confirmation',{
                    text : 'Are you sure you want to Update the form ?',
                    buttons : ['Yes','No']
                }).then(function(button){
                    if(button.innerText === 'Yes' ){
                        let model = {};
                        formPanel.childNodes.forEach(node => {
                            if('hasAttribute' in node && node.hasAttribute('is')){
                                const json = node.toJSON();
                                model = merge(model,json);
                            }
                        });
                        const formDatabaseLabel = document.getElementById('formDatabaseLabel');
                        
                        if(formDatabaseLabel.checkValidity()){
                            const resourceName = document.getElementById('formDatabaseName').value;
                            const version = (parseInt(document.getElementById('formVersion').value || '0')).toString();
                            const id = document.getElementById('formId').value;
                            
                            let form = {
                                type : 'form',
                                label : formDatabaseLabel.value,
                                name : resourceName,
                                version : version.toString(),
                                attribute : model,
                                beforeRequest : beforeRequestEditor.getValue(),
                                afterRequest : afterRequestEditor.getValue()
                            };
                            fetch('/res/system_forms/'+id,form,'PUT')
                            .then((result) => {
                                if(result.success){
                                    publish('app.notification','Form successfully Updated');
                                }else{
                                    publish('app.notification',result.message);
                                }
                            });
                        }
                    }
                });  
            });
            
            document.querySelectorAll('.input-item').forEach(node => {
                node.addEventListener('dragstart',event => {
                    const data = {
                        action : 'new',
                        type : event.target.getAttribute('data-type')
                    };
                    event.dataTransfer.setData('text',JSON.stringify(data));
                })
            });
            
            
            const createElement = (target,type) => {
                if(!(type in componentMap)){
                    publish('app.notification','Unable to find type of '+type);
                    return;
                }
                const marker = document.createElement('div');
                marker.classList.add('dropdown-target-marker');
                marker.classList.add('hide');
                const div = document.createElement('div');
                componentMap[type].render().then(html => {
                    div.innerHTML = html;
                    target.parentNode.insertBefore(marker,target);
                    target.parentNode.insertBefore(div.firstChild,target);
                });    
                
            };
            
            formPanel.addEventListener('drop',event => {
                event.preventDefault();
                const target = event.target;
                if(target.classList.contains('dropdown-target-marker')){
                    const data = JSON.parse(event.dataTransfer.getData('text'));
                    if(data.action === 'new'){
                        createElement(target,data.type);
                    }
                    if(data.action == 'move'){
                        const element = document.getElementById(data.id);
                        const marker = element.previousSibling;
                        if(marker !== target){
                            target.parentNode.insertBefore(marker,target);
                            target.parentNode.insertBefore(element,target);
                        }
                    }
                    
                }
                document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.add('hide'));
            });
            
            formPanel.parentNode.addEventListener('dragover',event => {
                event.preventDefault();
                document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.remove('selected'));
                if(event.target === formPanel){
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.remove('hide'));
                } else if (event.target.classList.contains('dropdown-target-marker')){
                   event.target.classList.add('selected');
                } else if (event.target === formPanel){
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.add('hide')); 
                }
            });
            
            
            const designPanel = document.querySelector('.design-panel');
            const beforeRequestPanel = document.querySelector('.before-request-panel');
            const afterRequestPanel = document.querySelector('.after-request-panel');
            
            document.querySelector('.design-button').addEventListener('click',event => {
                document.querySelectorAll('.flex-full').forEach(node => node.classList.remove('visible'));
                designPanel.classList.add('visible');
            });
            document.querySelector('.before-request-button').addEventListener('click',event => {
                document.querySelectorAll('.flex-full').forEach(node => node.classList.remove('visible'));
                beforeRequestPanel.classList.add('visible');
            });
            document.querySelector('.after-request-button').addEventListener('click',event => {
                document.querySelectorAll('.flex-full').forEach(node => node.classList.remove('visible'));
                afterRequestPanel.classList.add('visible');
            });
            
        </script>
    `)
    } catch (err) {
        console.error(err);
    }
};
