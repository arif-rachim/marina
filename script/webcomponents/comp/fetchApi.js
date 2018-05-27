const fetchApi = async (api,json,method) => {
    let result = false;
    try{
        if(json){
            console.log(`${method} : /${api}`,json);
            if(method == null){
                console.error("Method is required when JSON param is defined");
                throw new Error("Method is required when JSON param is defined");
            }
            result = await fetch(`/${api}`,{
                method : method,
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials: 'same-origin',
                body : JSON.stringify(json)
            });    

        }else{
            result = await fetch(`/${api}`);
        }
        result = await result.json();
    }catch(err){
        console.error(err);
    }
    return result;
}
export default fetchApi;