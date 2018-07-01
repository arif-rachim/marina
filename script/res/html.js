const notification = require('../page/components/notification');
const confirmation = require('../page/components/confirmation');
const slider = require('../page/components/slider');
const loader = require('../page/components/loader');

module.exports = (req,template) => {
  return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${req.params.resource || ''}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <script src="/svc/system.module?name=polyfill&path=common.polyfill"></script>
            <script src="/script/common/app.js"></script>
            <link rel="stylesheet" href="/styles/bootstrap.min.css" >
        </head>
        <body>
            <style>
                .table {
                    font-size: small;
                }
            </style>
            ${req.print(slider(req))}
            ${req.print(confirmation(req))}
            ${template}
            ${req.print(notification(req))}
            ${req.print(loader(req))}
        </body>
    </html>
  `;
};