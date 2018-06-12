const { fetch } = require('../../../../config');
const googleApiKey = process.env.GOOGLE_API_KEY;
module.exports = (req) => {
    return `
        <script src="/node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
        
        <script>
            (function(exports){
                exports.app = exports.app || {};
                var app = exports.app;
                
            })(window);
            
        </script>
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
            <label for="location"> Location :</label>
            <div id="map" style="width: 100%;height: 400px;"></div>
            <input type="hidden" name="Location" id="location" required class="form-control" placeholder="Lattitude Longitude" style="margin-top:1em">
        </div>
        <div class="form-item">
            <label for="address"> Address </label>
            <textarea name="Address" id="address" rows="3" class="form-control" placeholder="Enter address"></textarea>
        </div>
        
        <div class="form-item" style="display: flex;flex-wrap: wrap;margin : -0.5em">
            <div style="width: 320px;margin: 0.5em">
                <label for="from"> From :</label>
                <div style="display: flex">
                    <input type="datetime-local" name="From" id="from" data-type="date" required 
                    class="form-control ">
                </div>
            </div>
            
            <div style="width: 320px;margin: 0.5em">
                <label for="untilDate"> Until :</label>
                <div style="display: flex">
                    <input type="datetime-local" name="Until" id="until" data-type="date" required 
                    class="form-control " >
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
            <input type="button" style="width: auto;float: right" class="btn" value="Cancel" onclick="App.pubsub.publish('cetc.events.page:list')">
        </div>
    </form>
    <script>
        (function(exports){
            exports.app = exports.app || {};
            
            var editor = null;
            
            ClassicEditor.create( document.querySelector( '#description' )).then(function(_editor){
                editor = _editor;
            });
            
            
            document.querySelector('.event-form').addEventListener('submit',submitForm);
            document.querySelector('.event-form input[type="reset"]').addEventListener('click',clearForm);
            
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
            
            App.pubsub.subscribe('cetc.events.page:list',clearForm);
            function clearForm() {
                setValue('name','');
                setValue('address','');
                setValue('from','');
                setValue('until','');
                setDescriptionValue('');
                setValue('location','');
                setValue('_id','');
            }
            
            function submitForm() {
                
                try{
                    var app = exports.app;
                    window.scrollTo(0,0);
                    app.showConfirmation('Are you sure you want to Save ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes'){
                            var data = {
                                name: getValue('name'),
                                address: getValue('address'),
                                description: getDescriptionValue(),
                                from : getValue('from'),
                                until : getValue('until'),
                                location : getValue('location')
                            };
                            
                            var id = getValue('_id');
                            App.net.fetch('/res/cetc_events'+(id?'/'+id:''),data,(id?'PUT':'POST')).then(function(data){
                                if(app.showNotification){
                                    app.showNotification('Data saved successfully');
                                    App.pubsub.publish('cetc.events.page:list');
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
                App.net.fetch('/res/cetc_events/'+id).then(function(event){
                    clearForm();
                    if(event){
                        setValue('name',event.name);
                        setValue('address',event.address);
                        setValue('from',event.from);
                        setValue('until',event.until);
                        setValue('location',event.location);
                        setMapLocation(event.location);
                        setDescriptionValue(event.description);
                        setValue('_id',event._id);
                        App.pubsub.publish('cetc.events.page:form');
                    }
                });
            }
            
            // for google maps code here
            var geocoder;
            var map;
            var marker;
            
            app.initMap = function(){
                var hq = {lat: 24.471287, lng: 54.345337};
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 18, 
                    center: hq,
                    mapTypeControl: false
                });
                geocoder = new google.maps.Geocoder();
                marker = new google.maps.Marker({
                    position: hq,
                    map: map,
                    draggable: true //make it draggable
                });
                google.maps.event.addListener(map, 'click', function(event) {                
                    var clickedLocation = event.latLng;
                    marker.setPosition(clickedLocation);
                    markerLocation(marker.position);
                });  
            };
            
            function setMapLocation(locationString){
                if(locationString && locationString.length > 0 && locationString.indexOf(',') > 0 && marker && map){
                    var location = locationString.split(',');
                    location = {
                        lat : parseFloat(location[0].trim()),
                        lng : parseFloat(location[1].trim())
                    };
                    marker.setPosition(location);
                    map.setCenter(location);
                }
            }
            
            function markerLocation(position) {
                var location = document.querySelector('[name="Location"]');
                location.value = position.lat()+', '+position.lng();
                geocoder.geocode({'location': position}, function(results, status) {
                  if (status === 'OK') {
                      document.querySelector('[name="Address"]').value = results[0].formatted_address;  
                  }
                });
            }
            
            exports.app.submitEventForm = submitForm;
            exports.app.loadEventForm = loadForm;
            exports.app.clearEventForm = clearForm;
        })(window);
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&callback=app.initMap"></script>
    `
};