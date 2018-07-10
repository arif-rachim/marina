const {fetch} = require('../../../config');

const pullChildrenElements = (children) => {
    let result = [];
    children.forEach(child => {
        if('attribute' in child){
            if(child.attribute.name && child.attribute.name.value){
                result.push({
                    name : child.attribute.name.value,
                    label : child.attribute.label.value,
                    type : child.type
                });
            }

            if('children' in child.attribute){
                result = result.concat(pullChildrenElements(child.attribute.children));
            }
        }

    });
    return result;
};

module.exports = async (req,res) => {
    const resource = req.params.resource;
    const result = await fetch(`/res/system_forms?name=|${resource}|&$s.version=-1`);
    var element = result.docs[0];
    res.end(JSON.stringify(pullChildrenElements([element])));
};