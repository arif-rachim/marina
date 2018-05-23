const fetch = require("node-fetch");
const applicationPort = process.env.SERVER_PORT || 8000;
const apiServer = process.env.API_SERVER || `http://localhost:${applicationPort}`;
const textToBase64 = (text) => Buffer.from(text).toString('base64');
const base64ToText = (base64) => Buffer.from(base64, 'base64').toString('utf-8');
const apiFetch = async (api,json,method) => {
    let result = false;
    try{
        if(json){
            console.log(`${method} : ${apiServer}/${api}`,json);
            if(method == null){
                console.error("Method is required when JSON param is defined");
                throw new Error("Method is required when JSON param is defined");
            }
            result = await fetch(`${apiServer}/${api}`,{
                method : method,
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(json)
            });    

        }else{
            result = await fetch(`${apiServer}/${api}`);
        }
        result = await result.json();
    }catch(err){
        console.error(err);
    }


    return result;
}

module.exports = {
    intentsPath : "./script/intents",
    svcPath : "./script/svc",
    applicationPort,
    apiServer,
    administrator : {
        userName : "admin",
        password : "YWRtaW4="
    },
    textToBase64,
    base64ToText,
    fetch : apiFetch
};