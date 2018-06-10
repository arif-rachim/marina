const {fetch,textToBase64,base64ToText} = require('../../../config');

const basicAccessibility = [
    {
        name : 'Users Management',
        shortName : 'Users Management',
        description : 'Access for Managing Users',
        path : '/page/user.page'
    },
    {
        name : 'Roles Management',
        shortName : 'Roles Management',
        description : 'Access for Managing Roles',
        path : '/page/role.page'
    },
    {
        name : 'Access Management',
        shortName : 'Access Management',
        description : 'Access for Managing Access',
        path : '/page/access.page'
    }
    ,
    {
        name : 'Articles Management',
        shortName : 'Articles Management',
        description : 'Access for Managing Articles',
        path : '/page/cetc.articles.page'
    }
    ,
    {
        name : 'Events Management',
        shortName : 'Events Management',
        description : 'Access for Managing Events',
        path : '/page/cetc.events.page'
    }
    ,
    {
        name : 'Contacts Management',
        shortName : 'Contacts  Management',
        description : 'Access for Managing Contacts',
        path : '/page/cetc.contacts.page'
    }
    ,
    {
        name : 'Contacts Card',
        shortName : 'Contacts  Card',
        description : 'Access for Viewing Contacts Card',
        path : '/page/cetc.contacts.cards'
    }
    ,
    {
        name : 'Events Card',
        shortName : 'Events  Card',
        description : 'Access for Viewing Events Card',
        path : '/page/cetc.events.cards'
    }
];

const basicRoles = [
    {
        name : 'Administrator',
        description : 'Administrator Role',
        accessibility : 'Users Management,Roles Management,Access Management'
    },
    {
        name : 'Power User',
        description : 'CETC Member',
        accessibility : 'Articles Management,Events Management,Contacts Management'
    },
    {
        name : 'Member',
        description : 'CETC Member',
        accessibility : 'Contacts Card,Events Card'
    }
]

const basicUsers = [
    {
        name : 'Administrator',
        userId : 'Admin',
        email : 'admin@admin.admin',
        phone : '0501234567',
        roles : 'Administrator',
        password : textToBase64('admin')
    },
    {
        name : 'Power User',
        userId : 'power',
        email : 'power.user@demo.demo',
        phone : '0501234567',
        roles : 'Power User',
        password : textToBase64('power')
    }
    ,
    {
        name : 'Member',
        userId : 'member',
        email : 'member@member.member',
        phone : '0501234567',
        roles : 'Member',
        password : textToBase64('member')
    }
]

const ensureAccessExist = async (access) => {
    const data = await fetch(`/res/system_accessibility?name=${access.name}`);
    if(data.docs && data.docs.length == 1){
        console.log(`[INFO] Accessibility ${access.name} already exist`);
        return data.docs[0];
    }
    access = basicAccessibility.filter(template => template.name == access.name)[0];
    const persistentData = await fetch('/res/system_accessibility',access,'post')
    console.log(`[INFO] Accessibility ${persistentData.name} created`);
    return persistentData;
}

const ensureRolesExist = async (role) => {
    const data = await fetch(`/res/system_roles?name=${role.name}`);
    if(data.docs && data.docs.length == 1){
        console.log(`[INFO] Role ${role.name} already exist`);
        return data.docs[0];
    }
    role = basicRoles.filter(template => template.name == role.name)[0];
    const accessibilitiesForRole = role.accessibility.split(',');
    const accessibilityEntitiesForRole = [];
    for (let index = 0; index < accessibilitiesForRole.length; index++) {
        let entity = await ensureAccessExist({name:accessibilitiesForRole[index]});
        accessibilityEntitiesForRole.push(entity._id);
    }
    role.accessibility = accessibilityEntitiesForRole;
    const persistentData = await fetch('/res/system_roles',role,'post');
    console.log(`[INFO] Role ${role.name} created`);
    return persistentData;
}

const ensureUsersExist = async (user) => {
    const data = await fetch(`/res/system_users?userId=${user.userId}`);
    if(data.docs && data.docs.length == 1){
        console.log(`[INFO] User ${user.userId} already exist`);
        return data.docs[0];
    }
    user = basicUsers.filter(template => template.userId == user.userId)[0];
    const rolesForUser = user.roles.split(',');
    const rolesEntitiesForUser = [];
    for (let index = 0; index < rolesForUser.length; index++) {
        let entity = await ensureRolesExist({name:rolesForUser[index]});
        rolesEntitiesForUser.push(entity._id);
    }
    user.roles = rolesEntitiesForUser;
    const persistentData = await fetch('/res/system_users',user,'post');
    console.log(`[INFO] User ${user.userId} created`);
    return persistentData;
};

const setupUsers = async () => {
    for (let index = 0; index < basicUsers.length; index++) {
        await ensureUsersExist(basicUsers[index]);
    }
};

module.exports = async (req,res) => {
    await setupUsers();
    res.end(JSON.stringify({
        success: true,
        message: 'System initialized'
    }));
}