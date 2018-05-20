const template = require('./mdl-plain.js');

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const renderAttributes = (attributes) => {
    function renderAttribute(attribute){
        let id = guid();
        return `
        <div style="display: flex;flex-wrap: wrap;" class="form-item" id="${id}">
            <div id="input-name-${id}" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="flex: 2 1 auto" >
                <input data-key="${id}" class="mdl-textfield__input" type="text" name="name" id="item-${id}-name" value="${attribute.name}" onkeyup="forceLower(this)">
                <label class="mdl-textfield__label" for="item-${id}-name">Attribute Name:</label>
            </div>
            <div id="input-type-${id}" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="flex: 1 1 auto" >
                <input data-key="${id}" class="mdl-textfield__input" type="text" name="type" id="item-${id}-type" list="attributeType" value="${attribute.type}" onkeyup="forceLower(this)">
                <label class="mdl-textfield__label" for="item-${id}-type">Attribute Type:</label>
                <datalist id="attributeType">
                    <option value="string">
                    <option value="number">
                    <option value="date">
                    <option value="boolean">
                </datalist>
            </div>
            <div id="input-label-${id}" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label " style="flex: 1 1 auto" >
                <input data-key="${id}" class="mdl-textfield__input" type="text" name="label" id="item-${id}-label" value="${attribute.label}">
                <label class="mdl-textfield__label" for="item-${id}-label">Label:</label>
            </div>
            <div id="input-description-${id}" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label " style="flex: 1 1 auto" >
                <input data-key="${id}" class="mdl-textfield__input" type="text" name="description" id="item-${id}-description" value="${attribute.description}">
                <label class="mdl-textfield__label" for="item-${id}-description">Description:</label>
            </div>
            
            
            <div style="width: 130px">
                <label id="input-required-${id}" class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="item-${id}-required" style="flex: 1 1 auto;margin-top: 1.5em;" >
                <input data-key="${id}" type="checkbox" name="required" id="item-${id}-required" class="mdl-switch__input" ${attribute.required ? 'checked':''}>
                <span class="mdl-switch__label">Required</span>
            </div>
            
            <div style="text-align:right">
                <button id="input-delete-${id}" data-id="${id}" class="mdl-button mdl-js-button mdl-button--icon" style="margin-top:0.6em" onclick="deleteItem(event)" >
                <i class="material-icons">delete</i>
                </button>
            </div> 
        </div>
`;
    }
    attributes = attributes || [];
    return attributes.map(renderAttribute).join(' ');
};


const content = ({resource,attributes,createdOn}) => `
    <style>
    .form-item{
        padding: 1em;
        margin-bottom: 1em;
        border: 1px solid #CCCCCC;
    }
    
    .form-item:nth-child(even){
        background: #FAFAFA;
    }
    </style>
    <h3 style="margin-top:0px">Resource Design Editor (${resource})</h3>
      <p>
        This is a resource designer form. You can define resources by adding or removing attributes to resources. Please note that the name of the resource must be lowercase and underscore characters. The following are examples of allowed resource names:
      </p>
      <form id="form-designer" onsubmit="return false;" >
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%">
            <input class="mdl-textfield__input" type="text" name="resource" id="resource" value="${resource}" readonly>
            <label class="mdl-textfield__label" for="resource">Resource Name:</label>
        </div>
        <div id="dynamicParamHolder">
            ${renderAttributes(attributes)}
            <span id="holder" style="display: none"></span>
        </div>
        <input type="hidden" value="${createdOn}" id="input-created-on" /> 
        <div style="display: flex">
            <div style="flex: 1 1 auto;">
                <button onclick="submitForm()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Save</button>
            </div>
            <div>
                <button onclick="addField()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Add Field</button>
            </div>
        </div>
    </form>
          
<script>
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function addField(){
        var dynamicParamHolder = document.getElementById('dynamicParamHolder');
        var childCount = guid();
        var div = document.createElement('div');
        div.setAttribute('style',"display: flex;flex-wrap: wrap;");
        div.setAttribute('class','form-item');
        div.setAttribute('id',childCount);
        var elements = [];
        elements.push('<div id="input-name-'+childCount+'" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="flex: 2 1 auto">');
        elements.push('<input data-key="'+childCount+'" class="mdl-textfield__input" type="text" name="name" id="item-'+childCount+'-name" value="" onkeyup="forceLower(this)">');
        elements.push('<label class="mdl-textfield__label" for="item-'+childCount+'-name">Attribute Name:</label>');
        elements.push('</div>');
        elements.push('<div id="input-type-'+childCount+'" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="flex: 1 1 auto">');
        elements.push('<input data-key="'+childCount+'" class="mdl-textfield__input" type="text" name="type" id="item-'+childCount+'-type" list="attributeType" onkeyup="forceLower(this)">');
        elements.push('<label class="mdl-textfield__label" for="item-'+childCount+'-type">Attribute Type:</label>');
        elements.push('<datalist id="attributeType">');
        elements.push('<option value="string">');
        elements.push('<option value="number">');
        elements.push('<option value="date">');
        elements.push('<option value="boolean">');
        elements.push('</datalist>');
        elements.push('</div>');
        
        
        elements.push('<div id="input-label-'+childCount+'" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="flex: 1 1 auto">');
        elements.push('<input data-key="'+childCount+'" class="mdl-textfield__input" type="text" name="label" id="item-'+childCount+'-label" value="">');
        elements.push('<label class="mdl-textfield__label" for="item-'+childCount+'-label">Label:</label>');
        elements.push('</div>');
        
        elements.push('<div id="input-description-'+childCount+'" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="flex: 1 1 auto">');
        elements.push('<input data-key="'+childCount+'" class="mdl-textfield__input" type="text" name="description" id="item-'+childCount+'-description" value="">');
        elements.push('<label class="mdl-textfield__label" for="item-'+childCount+'-description">Description:</label>');
        elements.push('</div>');
        
        
        elements.push('<div style="width: 130px">');
        elements.push('<label id="input-required-'+childCount+'" class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="item-'+childCount+'-required" style="flex: 1 1 auto;margin-top: 1.5em;">');
        elements.push('<input data-key="'+childCount+'" type="checkbox" name="required" id="item-'+childCount+'-required" class="mdl-switch__input">');
        elements.push('<span class="mdl-switch__label">Required</span>');
        elements.push('</label>');
        elements.push('</div>');
        
        elements.push('<div style="text-align:right">');
        elements.push('<button id="input-delete-'+childCount+'" data-id="'+childCount+'" class="mdl-button mdl-js-button mdl-button--icon" style="margin-top:0.6em" onclick="deleteItem(event)">');
        elements.push('<i class="material-icons">delete</i>');
        elements.push('</button>');
        elements.push('</div>');
        
        div.innerHTML = elements.join('\\n');
        dynamicParamHolder.insertBefore(div,document.getElementById('holder'));
        componentHandler.upgradeElement(document.getElementById('input-name-'+childCount));
        componentHandler.upgradeElement(document.getElementById('input-type-'+childCount));
        componentHandler.upgradeElement(document.getElementById('input-required-'+childCount));
        componentHandler.upgradeElement(document.getElementById('input-delete-'+childCount));
        componentHandler.upgradeElement(document.getElementById('input-label-'+childCount));
        componentHandler.upgradeElement(document.getElementById('input-description-'+childCount));
        
        return false;
    }
    
    function deleteItem(event){
        var id = event.currentTarget.getAttribute('data-id');
        var item = document.getElementById(id);
        item.parentNode.removeChild(item);
    }
    
    function submitForm(){
        var inputs = Array.prototype.slice.call(document.querySelectorAll('#dynamicParamHolder input'));
        var data = inputs.reduce(function(result,input){
            result[input.getAttribute('data-key')] = result[input.getAttribute('data-key')] || {};
            if(input.type == 'checkbox'){
                result[input.getAttribute('data-key')][input.getAttribute('name')] = input.checked;
            }else{
                result[input.getAttribute('data-key')][input.getAttribute('name')] = input.value;    
            }
            return result;
        },{});
        let attributes = [];
        for(let prop in data){
            if(data.hasOwnProperty(prop)){
                attributes.push(data[prop]);
            }
        }
        postData('${resource}?_mode=design', {
            apiVersion: 'v1',
            resource: '${resource}',
            attributes: attributes,
            createdOn: document.getElementById('input-created-on').value
        }).then(function(data){
          console.log(data);
        }).catch(function(error) {
          console.error(error);
        });
        
    }
    
    function postData(url, data) {
      // Default options are marked with *
      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      .then(function(response){
          response.json()
      });
    }
    
    function forceLower(strInput){
        strInput.value = strInput.value.toLowerCase().split(' ').join('_');
    }    
</script>
`;

module.exports = ({resource,attributes,createdOn}) => template({title : 'Resource Designer',content : content({resource,attributes,createdOn})});