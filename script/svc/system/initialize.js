const {fetch,textToBase64,base64ToText} = require('../../../config');

const basicAccessibility = [
    {
        name : 'Users Management',
        code : 'USERS_MANAGEMENT',
        path : '/page/user.page'
    },
    {
        name : 'Roles Management',
        code : 'ROLES_MANAGEMENT',
        path : '/page/role.page'
    },
    {
        name : 'Access Management',
        code : 'ACCESS_MANAGEMENT',
        path : '/page/access.page'
    }
];

const basicRoles = [
    {
        name : 'Administrator',
        code : 'ADMINISTRATOR',
        accessibility : 'USERS_MANAGEMENT,ROLES_MANAGEMENT,ACCESS_MANAGEMENT'
    }
]

const basicUsers = [
    {
        name : 'Administrator',
        userId : 'Admin',
        email : 'admin@admin.admin',
        phone : '0501234567',
        roles : 'ADMINISTRATOR',
        password : textToBase64('admin')
    }
]

const ensureAccessExist = async (access) => {
    const data = await fetch(`/v1/system_accessibility?code=${access.code}`);
    if(data.docs && data.docs.length == 1){
        console.log(`[INFO] Accessibility ${access.code} already exist`);
        return data.docs[0];
    }
    access = basicAccessibility.filter(template => template.code == access.code)[0];
    const persistentData = await fetch('/v1/system_accessibility',access,'post')
    console.log(`[INFO] Accessibility ${persistentData.code} created`);
    return persistentData;
}

const ensureRolesExist = async (role) => {
    const data = await fetch(`/v1/system_roles?code=${role.code}`);
    if(data.docs && data.docs.length == 1){
        console.log(`[INFO] Role ${role.code} already exist`);
        return data.docs[0];
    }
    role = basicRoles.filter(template => template.code == role.code)[0];
    const accessibilitiesForRole = role.accessibility.split(',');
    const accessibilityEntitiesForRole = [];
    for (let index = 0; index < accessibilitiesForRole.length; index++) {
        let entity = await ensureAccessExist({code:accessibilitiesForRole[index]});    
        accessibilityEntitiesForRole.push(entity);
    }
    role.accessibility = accessibilityEntitiesForRole;
    const persistentData = await fetch('/v1/system_roles',role,'post');
    console.log(`[INFO] Role ${role.code} created`);
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
        let entity = await ensureRolesExist({code:rolesForUser[index]});    
        rolesEntitiesForUser.push(entity);
    }
    user.roles = rolesEntitiesForUser;
    const persistentData = await fetch('/v1/system_users',user,'post');
    console.log(`[INFO] User ${user.userId} created`);
    return persistentData;
}

const setupUsers = async () => {
    for (let index = 0; index < basicUsers.length; index++) {
        await ensureUsersExist(basicUsers[index]);
    }
}

module.exports = async (req,res) => {
    await setupUsers();
    res.end(JSON.stringify({
        success: true,
        message: 'System initialized'
    }));
}