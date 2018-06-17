const {fetch} = require('../../../config');
const html = require('../html');
module.exports = req => {

    return html(req,`
<style>
    
    .form-builder{
        padding : 1em;
        display: flex;
    }
    .control-panel{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .design-panel{
        width: 100%;
        border: 1px dotted blue;
    }
    .control-item{
        padding:0.5em 1em;
        border-radius: 1em;
        display: flex;
        margin: 0.5em;
        background-color: #ECECEC !important;
        height: 3em;
    }
    
    .form-item{
        box-sizing: border-box;
    }
    
    .form-item.select{
        background-color: #eeeeee;
    }
    
    .hide{
        opacity: 0;
    }
    
    .border-dashed{
        border : 1px dotted dodgerblue;
        min-height: 3em;
        min-width: 1em;
    }
    
    .mg-sm{
        padding: 0.5em;
        margin: 0em;
    }
    
    .properties-panel{
        width: 100%;
        border: 1px dotted darkred;
    }
    
    .temp-element{
        border : 1px dotted #1c7430;
        width: 100%;
        height: 5em;
    }
</style>
<div style="display:none;">

    <div style="display: none" class="single-line-text-template">
        <div class="form-group mg-sm">
            <label >Text</label>
            <input type="text" class="form-control" placeholder="Enter Text">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="number-template">
        <div class="form-group mg-sm">
            <label >Number</label>
            <input type="number" class="form-control" placeholder="Enter Number">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="paragraph-text-template">
        <div class="form-group mg-sm">
            <label >Paragraph Text</label>
            <textarea name="paragraph-text" class="form-control" placeholder="Enter Text"></textarea>
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="checkboxes-template">
        <div class="form-group mg-sm">
            <label >Checkbox</label>
            <input type="checkbox" class="form-control" placeholder="Checkbox">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="multiple-choice-template">
        <div class="form-group mg-sm">
            <label >Radio</label>
            <input type="radio" class="form-control" placeholder="Radio">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    
    <div style="display: none" class="dropdown-template">
        <div class="form-group mg-sm">
            <label >Select</label>
            <select name="" id="" class="form-control">
                <option value="one">one</option>
                <option value="two">two</option>
                <option value="three">three</option>
            </select>
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="section-break-template">
        <div class="form-group mg-sm">
            <h3>Section break</h3>
        </div>
    </div>
    
    <div style="display: none" class="page-break-template">
        <div class="form-group mg-sm">
            <h3>Page break</h3>
        </div>
    </div>
    
    <div style="display: none" class="file-upload-template">
        <div class="form-group mg-sm">
            <label >File</label>
            <input type="file" class="form-control" placeholder="File">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="date-template">
        <div class="form-group mg-sm">
            <label >Date</label>
            <input type="date" class="form-control" placeholder="Enter Date">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="email-template">
        <div class="form-group mg-sm">
            <label >Email</label>
            <input type="email" class="form-control" placeholder="Enter Email">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="time-template">
        <div class="form-group mg-sm">
            <label >Time</label>
            <input type="time" class="form-control" placeholder="Enter Time">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="phone-template">
        <div class="form-group mg-sm">
            <label >Phone</label>
            <input type="tel" class="form-control" placeholder="Enter Telephone">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
    
    <div style="display: none" class="price-template">
        <div class="form-group mg-sm">
            <label >Price</label>
            <input type="number" class="form-control" placeholder="Enter Price">
            <small class="form-text text-muted">The information shall stay closed.</small>
        </div>
    </div>
</div>


<div class="form-builder">
    
    <div class="control-panel">
        <div class="control-item shadow-sm bg-white" data-type="single-line-text" draggable="true">
            <div style="width: 1.5em;margin-right: 0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 416h-24.013l26.586-80.782H292.8L319.386 416H296c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h136c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-26.739L275.495 42.746A16 16 0 0 0 260.382 32h-72.766a16 16 0 0 0-15.113 10.746L42.739 416H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h136c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zm64.353-271.778c4.348-15.216 6.61-28.156 7.586-34.644.839 6.521 2.939 19.476 7.727 34.706l41.335 124.006h-98.619l41.971-124.068z"/></svg>
            </div>
            Single Line Text
        </div>
        <div class="control-item shadow-sm bg-white" data-type="number" draggable="true">
            <div style="width: 1.5em;margin-right: 0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M308.811 113.787l-19.448-20.795c-4.522-4.836-4.274-12.421.556-16.95l43.443-40.741a11.999 11.999 0 0 1 8.209-3.247h31.591c6.627 0 12 5.373 12 12v127.07h25.66c6.627 0 12 5.373 12 12v28.93c0 6.627-5.373 12-12 12H301.649c-6.627 0-12-5.373-12-12v-28.93c0-6.627 5.373-12 12-12h25.414v-57.938c-7.254 6.58-14.211 4.921-18.252.601zm-30.57 238.569c0-32.653 23.865-67.356 68.094-67.356 38.253 0 79.424 28.861 79.424 92.228 0 51.276-32.237 105.772-91.983 105.772-17.836 0-30.546-3.557-38.548-6.781-5.79-2.333-8.789-8.746-6.922-14.703l9.237-29.48c2.035-6.496 9.049-9.983 15.467-7.716 13.029 4.602 27.878 5.275 38.103-4.138-38.742 5.072-72.872-25.36-72.872-67.826zm92.273 19.338c0-22.285-15.302-36.505-25.835-36.505-8.642 0-13.164 7.965-13.164 15.832 0 5.669 1.815 24.168 25.168 24.168 9.973 0 13.377-2.154 13.744-2.731.021-.046.087-.291.087-.764zM175.984 368H128V48c0-8.837-7.163-16-16-16H80c-8.837 0-16 7.163-16 16v320H16.019c-14.212 0-21.384 17.244-11.314 27.314l79.981 80.002c6.245 6.245 16.38 6.247 22.627 0l79.984-80.002c10.05-10.05 2.928-27.314-11.313-27.314z"/></svg>
            </div>
            Number
        </div>
        <div class="control-item shadow-sm bg-white" data-type="paragraph-text" draggable="true">
            <div style="width: 1.5em;margin-right: 0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M408 32H177.531C88.948 32 16.045 103.335 16 191.918 15.956 280.321 87.607 352 176 352v104c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V112h32v344c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V112h40c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24z"/></svg>
            </div>
        Paragraph Text
        </div>
        <div class="control-item shadow-sm bg-white" data-type="checkboxes" draggable="true">
            <div style="width: 1.5em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"/></svg>
            </div>
            Checkboxes
        </div>
        <div class="control-item shadow-sm bg-white" data-type="multiple-choice" draggable="true">
            <div style="width: 1.5em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"/></svg>
            </div>
            Multiple Choice
        </div>
        <div class="control-item shadow-sm bg-white" data-type="dropdown" draggable="true">
            <div style="width: 1.5em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M125.1 208h197.8c10.7 0 16.1 13 8.5 20.5l-98.9 98.3c-4.7 4.7-12.2 4.7-16.9 0l-98.9-98.3c-7.7-7.5-2.3-20.5 8.4-20.5zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"/></svg>
            </div>
            Dropdown
        </div>
        <div class="control-item shadow-sm bg-white" data-type="section-break" draggable="true">
            Section Break
        </div>
        <div class="control-item shadow-sm bg-white" data-type="page-break" draggable="true">
            Page Break
        </div>
        <!-- Fancy stuff -->
        <div class="control-item shadow-sm bg-white" data-type="file-upload" draggable="true">
            <div style="width: 1.5em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
            </div>
            File Upload
        </div>
        <div class="control-item shadow-sm bg-white" data-type="date" draggable="true">
            <div style="width: 1.5em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"/></svg>
            </div>
            Date
        </div>
        <div class="control-item shadow-sm bg-white" data-type="email" draggable="true">
            <div style="width: 1.5em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"/></svg>
            </div>
            Email
        </div>
        <div class="control-item shadow-sm bg-white" data-type="time" draggable="true">
            <div style="width: 1.5em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/></svg>
            </div>
            Time
        </div>
        <div class="control-item shadow-sm bg-white" data-type="phone" draggable="true">
            <div style="width: 1.5em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/></svg>
            </div>
            Phone
        </div>
        <div class="control-item shadow-sm bg-white" data-type="price" draggable="true">
            <div style="width: 2em;margin-right:0.5em">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 176c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 48h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"/></svg>
            </div>
            Price
        </div>
    </div>
    <div class="design-panel">
    
    </div>    
    <div class="properties-panel">
    
    </div>
</div>
<script>
    (function(){
        var designPanel = document.querySelector('.design-panel');
        var propertiesPanel = document.querySelector('.properties-panel');
        document.querySelectorAll('.control-item').forEach(function(node){
            node.addEventListener('dragstart',ondrag);
        });
        
        function ondrag(event){
            if(event.currentTarget.classList.contains('control-item')){
                event.dataTransfer.setData('text','new:'+event.target.getAttribute('data-type'));    
            }else if(event.currentTarget.classList.contains('form-item')){
                event.dataTransfer.setData('text','move:'+event.target.getAttribute('data-id'));
            }
            
        }
        
        designPanel.addEventListener('drop',ondrop);
        designPanel.addEventListener('dragover',ondragover);
        
        function createFormItem(elementName){
            var formItem = document.createElement('div');
            var template = document.querySelector('.'+elementName+'-template');
            formItem.innerHTML = template.innerHTML;
            formItem.classList.add('form-item');
            formItem.setAttribute('data-id',App.utils.guid());
            formItem.setAttribute('draggable',true);
            formItem.addEventListener('click',onFormItemClicked);
            formItem.addEventListener('dragover',ondragover);
            formItem.addEventListener('dragstart',ondrag);
            formItem.addEventListener('drop',ondrop);
            return formItem;
        }
        
        function ondrop(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            var action = event.dataTransfer.getData('text').split(':');
            if(action[0]==='new'){
                var formItem = createFormItem(action[1]);
                var target = event.currentTarget;
                if(target.classList.contains('design-panel')){
                    target.appendChild(formItem);    
                } else {
                    target.parentNode.insertBefore(formItem,target);
                }
            }
            if(action[0]==='move'){
                var element = document.querySelector('[data-id="'+action[1]+'"]');
                var target = event.currentTarget;
                if(target.classList.contains('design-panel')){
                    target.appendChild(element);
                } else {
                    target.parentNode.insertBefore(element,target);
                }
            }
            removeTempElement();
        }
        
        function onFormItemClicked(event) {
            var formItem = event.currentTarget;
            document.querySelectorAll('.form-item').forEach(function(node){
                node.classList.remove('select');
            });
            formItem.classList.add('select');
            showFormItemProperties(formItem);
        }
        
        var tempElement = (function(){
            var element = document.createElement('div');
            element.classList.add('temp-element');
            element.addEventListener('dragover',function(event){
                event.preventDefault();
                event.stopImmediatePropagation();
            });
            element.addEventListener('dragstart',ondrag);
            element.addEventListener('drop',ondrop);
            return element;
        })();
        
        function removeTempElement(){
            tempElement.parentNode.removeChild(tempElement);
        }
        
        function ondragover(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            var target = event.currentTarget;
            
            if(target.classList.contains('design-panel')){
                target.appendChild(tempElement);
            }else{
                var position = (event.clientY - target.getBoundingClientRect().top);
                var heightBeforeMoveBottom = target.clientHeight / 3;
                var mouseAtHalfTop =  position < heightBeforeMoveBottom;
                if(mouseAtHalfTop){
                    target.parentNode.insertBefore(tempElement,target);    
                }else if(target.nextSibling){
                    target.parentNode.insertBefore(tempElement,target.nextSibling);
                } 
            }
        }
        
        function showFormItemProperties(formItem){
            var label = document.querySelector('[data-id="'+formItem.getAttribute("data-id")+'"] label');
            var input = document.querySelector('[data-id="'+formItem.getAttribute("data-id")+'"] input');
            var description = document.querySelector('[data-id="'+formItem.getAttribute("data-id")+'"] small');
            
            var text = '<form>' +
            '<div class="form-group mg-sm"><label>Label</label><input type="text" value="'+label.innerHTML+'" class="form-control"></div>'+
            '<div class="form-group mg-sm"><label>Name</label><input type="text" value="'+label.innerHTML+'" class="form-control"></div>'+
            '<div class="form-group mg-sm"><label>Instruction for User</label><textarea class="form-control">'+description.innerHTML+'</textarea></div>'+
            
            '<div class="form-check mg-sm" style="display:flex;align-items:center;"><input id="inputRequired" type="checkbox" value="required" style="font-size:2em"><label for="inputRequired" class="form-check-label" style="margin-left:0.5em;margin-bottom:0.1em;" >Required</label></div>'+
            '<div class="form-check mg-sm" style="display:flex;align-items:center;"><input id="inputNoDuplicate" type="checkbox" value="no-duplicate" ><label for="inputNoDuplicate" class="form-check-label" style="margin-left:0.5em;margin-bottom:0.1em;">No Duplicates</label></div>'+
            '<div class="form-check mg-sm" style="display:flex;align-items:center;"><input id="inputEncrypted" type="checkbox" value="encrypted" ><label for="inputEncrypted" class="form-check-label" style="margin-left:0.5em;margin-bottom:0.1em;">Encrypted</label></div>'+
            
             '</form>';
            propertiesPanel.innerHTML = text;
        }
        
    })();
</script>
`)};