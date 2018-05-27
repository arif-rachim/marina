module.exports = (req,res) => {
    console.log(req.headers);
    
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
            <!-- Viewport for responsive web design -->
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
            <!-- Document Title -->
            <title>${componentName}</title>
            <!-- Meta Description -->
            <meta name="description" content="Simple page to test the webcomponent">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
            ${chrome ? '' : `
            <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/custom-elements-es5-adapter.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-sd-ce.js"></script>
            `}
            
        </head>
        <body style="padding:1em">
            <script type="module">
                import Component from '/${chrome ? 'script' : 'build'}/webcomponents/${componentPath}.js';
                customElements.define('custom-component', Component);
            </script>
            <custom-component></custom-component>
        </body>
    </html>
    `);
}