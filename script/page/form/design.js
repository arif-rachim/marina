const html = require('../../res/html');
module.exports = (req) => {
    return html(req,`
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
                background-color: blue;
            }
            
            .hide {
                opacity: 0;
                width: 0 !important;
                height: 0 !important;
                min-height: 0;
            }
            
            .container-panel {
                width: 100%;
                display: flex;
                //padding: 0.5em;
                //border:1px solid red;
            }
            
            .container-panel .container-panel-item{
                width: 100%;
                //border: 1px dotted wheat;
                min-height: 1em;
                //padding: 0.5em;
            }
            
            .container-panel-item.vertical{
                display: flex;
                flex-direction: column;
            }
            
            .container-panel-item.horizontal{
                display: flex;
            }
            
            .full-width {
                width : 100%;
            }
            
            .margin-bt {
                margin-bottom : 1em;
            }
            
            .form-group.full-width.margin-bt-small {
                margin-bottom : 0.1em;
            }
            
            .form-group.full-width {
                margin-bottom: 0.5em;
                margin-left : 0.5em;
                margin-right : 0.5em;
            }
            
            
        </style>
        
        <div style="display: flex;height: 100vh">
            <div style="width: 300px;border-right: 1px solid #d3d9df;display: flex;flex-direction: column;padding: 1em">
                <div style="height: 100%">
                    <h3 style="font-weight: 100">Tools</h3>
                    <div style="width: 100%">
                        <div class="input-item" draggable="true" data-type="text">Text</div>
                        <div class="input-item" draggable="true" data-type="checkbox">Checkbox</div>
                        <div class="input-item" draggable="true" data-type="color">Color</div>
                        <div class="input-item" draggable="true" data-type="date">Date</div>
                        <div class="input-item" draggable="true" data-type="month">Month</div>
                        <div class="input-item" draggable="true" data-type="number">Number</div>
                        <div class="input-item" draggable="true" data-type="password">Password</div>
                        <div class="input-item" draggable="true" data-type="radio">Radio</div>
                        <div class="input-item" draggable="true" data-type="range">Range</div>
                        <div class="input-item" draggable="true" data-type="datetime-local">Datetime</div>
                        <div class="input-item" draggable="true" data-type="email">Email</div>
                        <div class="input-item" draggable="true" data-type="file">File</div>
                        <div class="input-item" draggable="true" data-type="hidden">Hidden</div>
                        
                        <div class="input-item" draggable="true" data-type="search">Search</div>
                        <div class="input-item" draggable="true" data-type="tel">Tel</div>
                        <div class="input-item" draggable="true" data-type="time">Time</div>
                        <div class="input-item" draggable="true" data-type="url">URL</div>
                        <div class="input-item" draggable="true" data-type="week">Week</div>
                        <div class="input-item" draggable="true" data-type="select">Drop Down</div>
                        <div class="input-item" draggable="true" data-type="textarea">Paragraph</div>
                        <div class="input-item" draggable="true" data-type="button">Button</div>
                    </div>
                </div>
                <div style="height: 100%">
                    <h3 style="font-weight: 100">Container</h3>
                    <div style="width: 100%">
                        <div class="input-item" draggable="true" data-type="vertical">Vertical</div>
                        <div class="input-item" draggable="true" data-type="horizontal">Horizontal</div>
                        <div class="input-item" draggable="true" data-type="collapsed">Collapsed</div>
                    </div>
                </div>
            </div>
            <div style="width: 100%;background-color: #F5F5F5;padding: 3em;display: flex;justify-content: center">
                <div style="width: 100%;background-color: white;border: 1px solid #d3d9df;min-height: 5em;max-width: 900px;padding: 1em;overflow:auto" id="form-panel">
                    <div class="dropdown-target-marker hide"></div>        
                </div>
            </div>
            <div style="width: 300px;border-left: 1px solid #d3d9df;padding:1em">
                <h3 style="font-weight: 100">Properties</h3>
            </div>
        </div>
        <script path="${__filename}">
            const formPanel = document.querySelector('#form-panel');
            const {guid} = require('../../common/utils');
            
            document.querySelectorAll('.input-item').forEach(node => {
                node.addEventListener('dragstart',event => {
                    const data = {
                        action : 'new',
                        type : event.target.getAttribute('data-type')
                    }
                    event.dataTransfer.setData('text',JSON.stringify(data));
                })
            });
            
            const createContainer = (target,type) => {
                const marker = document.createElement('div');
                marker.classList.add('dropdown-target-marker');
                marker.classList.add('hide');
                
                const div = document.createElement('div');
                div.innerHTML = '<div class="container-panel-item '+type+'">' +
                    '<div class="dropdown-target-marker hide"></div>'+
                    '</div>';
                div.classList.add('container-panel');
                div.classList.add(type);
                div.setAttribute('draggable',true);
                
                div.addEventListener('click', event => {
                    // we can do something here to enable deletion
                });
                
                target.parentNode.insertBefore(marker,target);
                target.parentNode.insertBefore(div,target);
                
            };
            
            const onElementClicked = (event) => {
                const element = event.currentTarget;
            }
            
            const createElement = (target,type) => {
                const marker = document.createElement('div');
                marker.classList.add('dropdown-target-marker');
                marker.classList.add('hide');
                
                const uid = guid();
                const elementId = guid();
                const div = document.createElement('div');
                
                
                div.setAttribute('id',elementId);
                
                // if input is text
                
                div.innerHTML = '<label for="'+uid+'" style="margin-bottom:0">'+type+'</label>'+ 
                '<input id="'+uid+'" type="'+type+'" class="form-control" placeholder="'+type+'">'+
                '<small >'+type+' Description </small>';
                
                if(['checkbox','radio'].indexOf(type) >= 0){
                    div.classList.add('form-check');
                    div.innerHTML = '<label class="form-check-label">'+ 
                    '<input type="'+type+'" class="form-check-input" placeholder="'+type+'">'+
                    type+'</label>';
                    div.classList.add('margin-bt-small');
                }
                
                if(type == 'button'){
                    div.innerHTML = '<input id="'+uid+'" type="'+type+'" class="btn btn-default" value="Button">';
                }
                
                if(type == 'textarea'){
                    div.innerHTML = '<label for="'+uid+'" style="margin-bottom:0px">Paragraph</label>'+ 
                    '<textarea id="'+uid+'" class="form-control" placeholder="Please enter data"></textarea>'+
                    '<small >Example of helper for input</small>';
                }
                
                if(type == 'select'){
                    div.innerHTML = '<label for="'+uid+'" style="margin-bottom:0px">Select</label>'+ 
                    '<select id="'+uid+'" class="form-control" placeholder="Please Select"></select>'+
                    '<small >Example of helper for input</small>';
                }
                
                div.classList.add('form-group');
                div.classList.add('full-width');
                
                div.setAttribute('draggable',true);
                
                div.addEventListener('dragstart',event => {
                    const data = {
                        action : 'move',
                        id : event.target.getAttribute('id')
                    }
                    event.dataTransfer.setData('text',JSON.stringify(data));
                })
                div.addEventListener('click',onElementClicked);
                
                target.parentNode.insertBefore(marker,target);
                target.parentNode.insertBefore(div,target);
                
            }
            
            formPanel.addEventListener('drop',event => {
                event.preventDefault();
                const target = event.target;
                if(target.classList.contains('dropdown-target-marker')){
                    const data = JSON.parse(event.dataTransfer.getData('text'));
                    if(data.action == 'new'){
                        if(['vertical','horizontal'].indexOf(data.type) >= 0){
                            createContainer(target,data.type);
                        }else{
                            createElement(target,data.type);
                        }
                    }
                    if(data.action == 'move'){
                        const element = document.getElementById(data.id);
                        const marker = element.previousSibling;
                        if(marker != target){
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
                if(event.target == formPanel){
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.remove('hide'));
                } else if (event.target.classList.contains('dropdown-target-marker')){
                   event.target.classList.add('selected');
                } else if (event.target == formPanel){
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.add('hide')); 
                }
            });
        </script>
    `)
};
