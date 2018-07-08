const theme = require('../page/theme');

module.exports = async (req,template) => {
  return theme(req,{title : 'Dynamic Page',breadcrumb:[],content : template});
};