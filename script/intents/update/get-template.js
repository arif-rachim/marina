const render = (attributes,data) => {
    return attributes.map(attribute => {
        if(attribute.type == 'boolean'){
            return `
            <vaadin-checkbox name="${attribute.name}" ${data[attribute.name] ? 'checked' : ''}>${attribute.label}</vaadin-checkbox>
            `;
        }
        if(attribute.type == 'number'){
            return `
            <vaadin-text-field label="${attribute.label}" ${attribute.required ? 'required' : ''} name="${attribute.name}" prevent-invalid-input pattern="[0-9]+(\\.[0-9][0-9]?)?" value="${data[attribute.name]}"></vaadin-text-field>
            `;
        }

        if(attribute.type == 'date'){
            return `
            <vaadin-date-picker label="${attribute.label}" ${attribute.required ? 'required' : ''} name="${attribute.name}" value="${data[attribute.name]}"></vaadin-date-picker>
            `;
        }

        return `
            <vaadin-text-field label="${attribute.label}" ${attribute.required ? 'required' : ''} name="${attribute.name}" value="${data[attribute.name]}"></vaadin-text-field>
        `;
    }).join(' ');
}

module.exports = (resource,data,design) => {
    const attributes = design.attributes;
    return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="/bower_components/polymer/polymer.html">
    <link rel="import" href="/bower_components/vaadin-text-field/vaadin-text-field.html">
    <link rel="import" href="/bower_components/vaadin-date-picker/vaadin-date-picker.html">
    <link rel="import" href="/bower_components/vaadin-checkbox/vaadin-checkbox.html">
    <link rel="import" href="/bower_components/vaadin-form-layout/vaadin-form-layout.html">
    <link rel="import" href="/bower_components/vaadin-button/vaadin-button.html">
    <link rel="import" href="/bower_components/vaadin-notification/vaadin-notification.html">
    <title>Form</title>
</head>
<body>
    <form id="form" onsubmit="return false;">
        <vaadin-form-layout id="form-layout">
            ${render(attributes,data)}
        </vaadin-form-layout>
        <vaadin-button theme="primary" id="submit-button" onclick="submitForm()">Submit</vaadin-button>
    </form>
    <script>
        function submitForm(){
            document.getElementById('submit-button').setAttribute('disabled',true);
            var form = document.getElementById('form-layout');
            var data = {
                _id: '${data._id}',
                _createdOn: ${data._createdOn}
            };
            
            for (var i = 0; i < form.children.length; i++) {
                var element = form.children[i];
                if(element.localName == 'vaadin-checkbox'){
                    data[element.getAttribute('name')] = element.__data.checked;
                }else{
                    data[element.getAttribute('name')] = element.value;
                }
            }
            fetch('/v1/${resource}/${data._id}', {
              method: 'put',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }).then(function(res){return res.json()}).then(function(res){
                document.getElementById('notification').open();
            });
        }
        
    </script>
    <vaadin-notification duration="4000" id="notification">
      <template>
        <div>
          <b>Notification</b><br>
          Data succesfully stored
        </div>
      </template>
    </vaadin-notification>
</body>
</html>
    `
}