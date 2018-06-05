const { fetch } = require('../../../../config');

module.exports = (req) => {
    return `
        <script src="/node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
        <style>
        
            .event-form {
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                align-items: flex-end;
            }
            
            .event-form input[type="text"]{
                padding: 0.3em;
                width: 100%;
            }
            
            .event-form label{
                display: block;
            }
            
            .event-form .form-item {
                padding:0.3em;
                width: 100%;
                box-sizing: border-box;
            }
            
            .radius-right-zero {
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
            }
            
            .radius-left-zero {
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
                border-left: none;
            }
            
            .ck.ck-content.ck-editor__editable {
                min-height: 300px;
            }
            
            @media screen and (max-width: 430px){
                .event-form div {
                    width: 100%;
                }
            }
            
        </style>
        <form class="event-form" onsubmit="return false;">
        <input type="hidden" name="_id" id="_id">
        <div class="form-item">
            <label for="name"> Event Name :</label>
            <input type="text" name="Name" id="name" required class="form-control" placeholder="Enter name">
        </div>
        <div class="form-item">
            <label for="address"> Address </label>
            <textarea name="address" id="address" rows="3" class="form-control" placeholder="Enter address"></textarea>
        </div>
        <div class="form-item">
            <label for="city"> City </label>
            <input type="text" name="City" id="city" required class="form-control" placeholder="Enter city">
        </div>
        <div class="form-item" style="display: flex;flex-wrap: wrap;margin : -0.5em">
            <div style="width: 320px;margin: 0.5em">
                <label for="fromDate"> From :</label>
                <div style="display: flex">
                    <input type="text" name="FromDate" id="fromDate" data-type="date" required 
                    class="form-control radius-right-zero" 
                    pattern="^((31(?!([-])(FEB|APR|JUNE?|SEP|NOV)))|((30|29)(?!([-])FEB))|(29(?=([-])FEB([-])(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))|(0?[1-9])|1\\d|2[0-8])([-])(JAN|FEB|MA(R|Y)|APR|JU(L|N)|AUG|OCT|(SEP|NOV|DEC))([-])((1[6-9]|[2-9]\\d)\\d{2}?)$" 
                    placeholder="DD-MMM-YYYY">
                    <input type="text" name="FromTime" id="fromTime" required class="form-control radius-left-zero" pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$" placeholder="HH:MM">
                </div>
            </div>
            
            <div style="width: 320px;margin: 0.5em">
                <label for="untilDate"> Until :</label>
                <div style="display: flex">
                    <input type="text" name="UntilDate" id="untilDate" data-type="date" required 
                    class="form-control radius-right-zero" 
                    pattern="^((31(?!([-])(FEB|APR|JUNE?|SEP|NOV)))|((30|29)(?!([-])FEB))|(29(?=([-])FEB([-])(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))|(0?[1-9])|1\\d|2[0-8])([-])(JAN|FEB|MA(R|Y)|APR|JU(L|N)|AUG|OCT|(SEP|NOV|DEC))([-])((1[6-9]|[2-9]\\d)\\d{2}?)$" 
                    placeholder="DD-MMM-YYYY">
                    <input type="text" name="UntilTime" id="untilTime" required class="form-control radius-left-zero" pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$" placeholder="HH:MM">
                </div>
            </div>
        </div>
        
        <div class="form-item">
            <label for="description"> Description :</label>
            <textarea name="Description" id="description" cols="30" rows="10" ></textarea>
        </div>
        <div style="width: 100%" class="form-item">
            <input type="submit" style="width: auto;" value="Save" class="btn btn-primary">
            <input type="reset" style="width: auto;margin-left:0.5em" class="btn">
        </div>
    </form>
    <script>
        (function(exports){
            exports.app = exports.app || {};
            
            var editor = null;
            
            ClassicEditor.create( document.querySelector( '#description' )).then(function(_editor){
                editor = _editor;
            });
            
            function toUpperCase(event){
                event.target.value = event.target.value.toUpperCase().split(' ').join('-');
            }
            
            document.querySelector('.event-form').addEventListener('submit',submitForm);
            document.querySelector('.event-form input[type="reset"]').addEventListener('click',clearForm);
            [].slice.call(document.querySelectorAll('[data-type="date"]')).forEach(function(dateNode){
                dateNode.addEventListener('keyup',toUpperCase);
            });
            function getValue(id){
                return document.getElementById(id).value;
            }
            function setValue(id,value){
                document.getElementById(id).value = value;
            }
            
            function getSelected(id){
                return document.getElementById(id).checked;
            }
            
            function setSelected(id,value){
                if(document.getElementById(id)){
                    document.getElementById(id).checked = value;
                }
            }
            
            function getDescriptionValue(){
                return editor.getData();
            }
            
            function setDescriptionValue(value){
                editor.setData(value);
            }
            
            function clearForm() {
                setValue('name','');
                setValue('address','');
                setValue('city','');
                setValue('fromDate','');
                setValue('fromTime','');
                setValue('untilDate','');
                setValue('untilTime','');
                setDescriptionValue('');
                setValue('_id','');
            }
            
            function submitForm() {
                
                try{
                    var app = exports.app;
                    window.scrollTo(0,0);
                    app.showConfirmation('Are you sure you want to Save ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes'){
                            var startFromString = getValue('fromDate').trim()+' '+getValue('fromTime').trim();
                            var endUntilString = getValue('untilDate').trim()+' '+getValue('untilTime').trim();
                            
                            var data = {
                                name: getValue('name'),
                                address: getValue('address'),
                                city: getValue('city'),
                                description: getDescriptionValue(),
                                startFrom : startFromString,
                                endUntil : endUntilString
                            };
                            
                            var id = getValue('_id');
                            app.fetch('/v1/cetc_events'+(id?'/'+id:''),data,(id?'PUT':'POST')).then(function(data){
                                if(app.showNotification){
                                    app.showNotification('Data saved successfully');    
                                }
                                if(app.refreshEventListTable){
                                    app.refreshEventListTable();
                                }
                              clearForm();
                            });
                       }
                    });
                  
                }catch(err){
                  console.error(err);
                }
            }
            
            function loadForm(id){
                app.fetch('/v1/cetc_events/'+id).then(function(event){
                    clearForm();
                    if(event){
                        
                        var fromDate = moment(event.startFrom,'DD-MMM-YYYY HH:mm');
                        var untilDate = moment(event.endUntil,'DD-MMM-YYYY HH:mm');
                        
                        setValue('name',event.name);
                        setValue('address',event.address);
                        setValue('city',event.city);
                        
                        setValue('fromDate',fromDate.format('DD-MMM-YYYY').toUpperCase());
                        setValue('fromTime',fromDate.format('HH:mm'));
                        setValue('untilDate',untilDate.format('DD-MMM-YYYY').toUpperCase());
                        setValue('untilTime',untilDate.format('HH:mm'));
                        setDescriptionValue(event.description);
                        setValue('_id',event._id);    
                    }
                });
            }
            
            exports.app.submitEventForm = submitForm;
            exports.app.loadEventForm = loadForm;
            exports.app.clearEventForm = clearForm;
        })(window);
    </script>
    `
};