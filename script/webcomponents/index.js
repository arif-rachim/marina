module.exports = (req,res) => {

    const chrome = req.headers["user-agent"].toUpperCase().indexOf("CHROME") > 0;
    const component = req.params.component;
    const componentsArray = component.split(".");
    const componentName = componentsArray[(componentsArray.length - 1)];
    const componentPath = componentsArray.join("/");
    res.end(`
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
            <title>${componentName}</title>
            <meta name="description" content="Simple page to test the webcomponent">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
            
        </head>
        <body style="padding:1em">
            <script type="module">
                import Component from '/script/webcomponents/${componentPath}.js';
                customElements.define('custom-component', Component);
                let queryString = window.location.search;
                queryString = queryString.substring(1,queryString.length);
                queryString = queryString.split("&").map((qs) => {
                    qs = qs.split("=");
                    return {name:qs[0],value:qs[1]}
                });
                setTimeout(() => {
                    let element = document.getElementById('customElement');
                    queryString.forEach(qs => {
                        if(qs.name){
                            element.setAttribute(qs.name,qs.value);
                        }
                    })
                },100);
            </script>
            <custom-component id="customElement"></custom-component>
        </body>
    </html>
    `);
};