const {fetch,textToBase64,base64ToText} = require('../../../config');

const basicAccessibility = [
    {
        name : 'Users Management',
        shortName : 'Users',
        description : 'Access for Managing Users',
        path : '/page/user.page'
    },
    {
        name : 'Roles Management',
        shortName : 'Roles',
        description : 'Access for Managing Roles',
        path : '/page/role.page'
    },
    {
        name : 'Access Management',
        shortName : 'Access',
        description : 'Access for Managing Access',
        path : '/page/access.page'
    }
];

const basicRoles = [
    {
        name : 'Administrator',
        description : 'Administrator Role',
        accessibility : 'Users Management,Roles Management,Access Management'
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
    }
]

const ensureAccessExist = async (access) => {
    const data = await fetch(`/v1/system_accessibility?name=${access.name}`);
    if(data.docs && data.docs.length == 1){
        console.log(`[INFO] Accessibility ${access.name} already exist`);
        return data.docs[0];
    }
    access = basicAccessibility.filter(template => template.name == access.name)[0];
    const persistentData = await fetch('/v1/system_accessibility',access,'post')
    console.log(`[INFO] Accessibility ${persistentData.name} created`);
    return persistentData;
}

const ensureRolesExist = async (role) => {
    const data = await fetch(`/v1/system_roles?name=${role.name}`);
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
    const persistentData = await fetch('/v1/system_roles',role,'post');
    console.log(`[INFO] Role ${role.name} created`);
    return persistentData;
}

const ensureUsersExist = async (user) => {
    const data = await fetch(`/v1/system_users?userId=${user.userId}`);
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
    const persistentData = await fetch('/v1/system_users',user,'post');
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