const theme = require('../page/theme');
const {fetch} = require('../../config');
module.exports = async (req,template,actions=[]) => {

    const lastIndex = req.originalUrl.indexOf('?');
    const resource = req.originalUrl.substring('/res/'.length,lastIndex);

    const result = await fetch(`/res/system_forms?name=|${resource}|&$s.version=-1`);
    const model = result.docs[0] || {label:'New Form'};

    return theme(req,{title : model.label,breadcrumb:[
          {
              title : 'Forms'
          },
          {
              title : model.label,
              path : '#'
          },
      ],content : template,actions});
};