module.exports = (req,res) => {
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
            <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-sd-ce.js"></script>
        </head>
        <body style="padding:1em">
            <script src="/build/webcomponents/${componentPath}.js" component-name="${componentName}"></script>
            <${componentName}></${componentName}>
        </body>
    </html>
    `);
}