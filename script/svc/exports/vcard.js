const vCard = require('vcards-js');
const {fetch} = require('../../../config');

module.exports = async (req,res) => {
    const id = req.query.id;
    const user = await fetch(`/res/cetc_contacts/${id}`);
    const card = new vCard();
    const names = user.name.split(' ');

    card.lastName = names.pop();
    card.firstName = names.join(' ');
    card.organization = user.company;
    card.workPhone = user.phone.split('.').join('-');
    card.title = user.jobTitle;
    card.note = user.notes;

    res.set('Content-Type', `text/vcard; name="${card.lastName.toLowerCase()}.vcf"`);
    res.set('Content-Disposition', `inline; filename="${card.lastName.toLowerCase()}.vcf"`);

    res.send(card.getFormattedString());
};