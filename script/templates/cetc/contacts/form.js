const { fetch } = require('../../../../config');

module.exports = (req) => {
    return `
        <style>
            .contact-form {
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                align-items: flex-end;
            }
            .contact-form input[type="text"]{
                padding: 0.3em;
                width: 100%;
            }
            
            .contact-form label{
                display: block;
            }
            .contact-form .form-item {
                padding:0.3em;
                width: 100%;
                box-sizing: border-box;
            }
            
            @media screen and (max-width: 430px){
                .contact-form div {
                    width: 100%;
                }
            }
            
        </style>
        <form class="contact-form" onsubmit="return false;">
        <input type="hidden" name="_id" id="_id">
        <div class="form-item">
            <label for="name"> Name :</label>
            <input type="text" name="Name" id="name" required class="form-control">
        </div>
        <div class="form-item" style="display: flex; box-sizing: border-box">
            <div style="margin-right: 0.5em;width: 100%">
                <label for="company"> Company :</label>
                <input type="text" name="Company" id="company" required class="form-control">
            </div>
            <div style="margin-left: 0.5em;width: 100%">
                <label for="jobTitle"> Job Title :</label>
                <input type="text" name="JobTitle" id="jobTitle" required class="form-control">
            </div>
        </div>
        <div class="form-item" style="display: flex; box-sizing: border-box">
            <div style="margin-right: 0.5em;width: 100%">
                <label for="email"> Email :</label>
                <input type="email" name="Email" id="email" required class="form-control">
            </div>
            <div style="margin-left: 0.5em;width: 100%">
                <label for="phone"> Phone :</label>
                <input type="tel" name="Phone" id="phone" required class="form-control">
            </div>
        </div>
        
        <div class="form-item">
            <label for="notes"> Notes :</label>
            <textarea name="Notes" id="notes" rows="5" class="form-control"></textarea>
        </div>
        <div style="width: 100%" class="form-item">
            <input type="submit" style="width: auto;" value="Save" class="btn btn-primary">
            <input type="reset" style="width: auto;margin-left:0.5em" class="btn">
        </div>
    </form>
    <script>
        (function(exports){
            exports.app = exports.app || {};
            
            document.querySelector('.contact-form').addEventListener('submit',submitForm);
            document.querySelector('.contact-form input[type="reset"]').addEventListener('click',clearForm);
            
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
            
            function clearForm() {
                setValue('name','');
                setValue('company','');
                setValue('jobTitle','');
                setValue('email','');
                setValue('phone','');
                setValue('notes','');
                setValue('_id','');
            }
            
            function submitForm() {
                
                try{
                    var app = exports.app;
                    app.showConfirmation('Are you sure you want to Save ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes'){

                            var data = {
                                name: getValue('name'),
                                company: getValue('company'),
                                jobTitle: getValue('jobTitle'),
                                email: getValue('email'),
                                phone: getValue('phone'),
                                notes: getValue('notes')
                            };
                            debugger;
                            var id = getValue('_id'); 
                            app.fetch('/v1/cetc_contacts'+(id?'/'+id:''),data,id?'PUT':'POST').then(function(data){
                                if(app.showNotification){
                                    app.showNotification('Data saved successfully');    
                                }
                                if(app.refreshContactListTable){
                                    app.refreshContactListTable();
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
                app.fetch('/v1/cetc_contacts/'+id).then(function(contact){
                    clearForm();
                    if(contact){
                        debugger;
                        setValue('name',contact.name);
                        setValue('company',contact.company);
                        setValue('jobTitle',contact.jobTitle);
                        setValue('email',contact.email);
                        setValue('phone',contact.phone);
                        setValue('notes',contact.notes);
                        setValue('_id',contact._id);    
                    }
                });
            }
            
            exports.app.submitContactForm = submitForm;
            exports.app.loadContactForm = loadForm;
            exports.app.clearContactForm = clearForm;
        })(window);
    </script>
    `
};