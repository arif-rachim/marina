const theme = require("./theme");
module.exports = (req) => {
    return theme(req,{title:'Page is under development',breadcrumb:[],content : `
        <div style="text-align: center">
            <div style="display: inline-block">
            <div style="display: flex;margin:3em;align-items: center;">
                <i class="fas fa-cogs" style="font-size: 2em;color:#333"></i>
                <div style="margin-left:1em;text-align: left">
                    <h1 style="font-size: 1.2em;color:#333">We are still working to build <span style="font-style: italic">${req.params.page}.</span></h1>
                    <p> We appreciate your patience and stay tuned for updates.</p>
                </div>
            </div>
            </div>
        </div>
    `});
};