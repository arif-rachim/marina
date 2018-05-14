module.exports = ({resource}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resource Designer</title>
    <link rel="stylesheet" href="/node_modules/material-design-lite/material.min.css" >
    <script src="/node_modules/material-design-lite/material.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <style>
    
        .demo-ribbon {
          width: 100%;
          height: 40vh;
          background-color: #3F51B5;
          flex-shrink: 0;
        }
        
        .demo-main {
          margin-top: -35vh;
          flex-shrink: 0;
        }
        
        .demo-header .mdl-layout__header-row {
          padding-left: 40px;
        }
        
        .demo-container {
          max-width: 1600px;
          width: calc(100% - 16px);
          margin: 0 auto;
        }
        
        .demo-content {
          border-radius: 2px;
          padding: 80px 56px;
          margin-bottom: 80px;
        }
        
        .demo-layout.is-small-screen .demo-content {
          padding: 40px 28px;
        }
        
        .demo-content h3 {
          margin-top: 48px;
        }
        
        .demo-footer {
          padding-left: 40px;
        }
        
        .demo-footer .mdl-mini-footer--link-list a {
          font-size: 13px;
        }
    </style>

     <div class="demo-layout mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100">
      <header class="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">Resource Design</span>
          <div class="mdl-layout-spacer"></div>
        </div>
      </header>
      <div class="demo-ribbon"></div>
      <main class="demo-main mdl-layout__content">
        <div class="demo-container mdl-grid">
          <div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
          <div class="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
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
                        <!--
                        <div style="display: flex">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="flex: 1 1 auto;margin-right: 1em">
                                <input class="mdl-textfield__input" type="text" name="resource" id="item-0-name" value="" >
                                <label class="mdl-textfield__label" for="item-0-name">Name:</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="flex: 1 1 auto;margin-right: 1em">
                                <input class="mdl-textfield__input" type="text" name="resource" id="item-0-type" list="attributeType">
                                <label class="mdl-textfield__label" for="item-0-type">Type:</label>
                                <datalist id="attributeType">
                                    <option value="String">
                                    <option value="Number">
                                    <option value="Date">
                                    <option value="Boolean">
                                </datalist>
                            </div>
                            <div style="flex: 1 1 auto;margin-right: 1.8em" >
                                 <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="item-0-required" style="flex: 1 1 auto;margin-top: 1.5em;">
                                  <input type="checkbox" id="item-0-required" class="mdl-switch__input" checked>
                                  <span class="mdl-switch__label">Required</span> 
                                </label>
                            </div>
                        </div> 
                        -->
                        <span id="holder" style="display: none"></span>
                    </div>
                    <button id="addButton" onclick="addField()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Add Field</button>
                </form>
          </div>
        </div>
        <footer class="demo-footer mdl-mini-footer">
          <div class="mdl-mini-footer--left-section">
            <ul class="mdl-mini-footer--link-list">
              <li><a href="#">Help</a></li>
              <li><a href="#">Privacy and Terms</a></li>
              <li><a href="#">User Agreement</a></li>
            </ul>
          </div>
        </footer>
      </main>
    </div>
  
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
        //var childCount = dynamicParamHolder.childElementCount;
        var childCount = guid();
        var div = document.createElement('div');
        div.setAttribute('style',"display: flex");
        div.setAttribute('id',childCount);
        var elements = [];
        elements.push('<div id="input-name-'+childCount+'" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width:100%;margin-right:1em">');
        elements.push('<input class="mdl-textfield__input" type="text" name="resource" id="item-'+childCount+'-name" value="" >');
        elements.push('<label class="mdl-textfield__label" for="item-'+childCount+'-name">Attribute Name:</label>');
        elements.push('</div>');
        elements.push('<div id="input-type-'+childCount+'" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width:200px;margin-right:1em">');
        elements.push('<input class="mdl-textfield__input" type="text" name="resource" id="item-'+childCount+'-type" list="attributeType">');
        elements.push('<label class="mdl-textfield__label" for="item-'+childCount+'-type">Attribute Type:</label>');
        elements.push('<datalist id="attributeType">');
        elements.push('<option value="string">');
        elements.push('<option value="number">');
        elements.push('<option value="date">');
        elements.push('<option value="boolean">');
        elements.push('</datalist>');
        elements.push('</div>');
        elements.push('<div style="flex: 1 1 auto;margin-right: 1.8em" >');
        elements.push('<label id="input-required-'+childCount+'" class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="item-'+childCount+'-required" style="flex: 1 1 auto;margin-top: 1.5em;">');
        elements.push('<input type="checkbox" id="item-'+childCount+'-required" class="mdl-switch__input">');
        elements.push('<span class="mdl-switch__label">Required</span>');
        elements.push('</label>');
        elements.push('</div>');
        elements.push('<div style="width:80px;text-align:right">');
        elements.push('<button id="input-delete-'+childCount+'" class="mdl-button mdl-js-button mdl-button--icon" style="margin-top:0.6em" onclick="deleteItem('+childCount+')">');
        elements.push('<i class="material-icons">delete</i>');
        elements.push('</button>');
        elements.push('</div>');
        
        div.innerHTML = elements.join('\\n');
        dynamicParamHolder.insertBefore(div,document.getElementById('holder'));
        componentHandler.upgradeElement(document.getElementById('input-name-'+childCount));
        componentHandler.upgradeElement(document.getElementById('input-type-'+childCount));
        componentHandler.upgradeElement(document.getElementById('input-required-'+childCount));
        componentHandler.upgradeElement(document.getElementById('input-delete-'+childCount));
        return false;
    }
    
    function deleteItem(itemNo){
        
        var item = document.getElementById(itemNo);
        item.parentNode.removeChild(item);
        debugger;
    }

</script>
  
    
</body>
</html>`;