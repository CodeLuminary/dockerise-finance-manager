class restApi{
    //Set domain name here
    static domain = "";
    //static domain = "http://localhost:8000"
    static domainState = false;

    static checkNetwork(){
        if(!navigator.onLine){alert("You are offline"); return false}
        return true;
    }

    static PostApi(url, requestObject, shouldAddAuthorization=false, isDomainUsed=restApi.domainState){      
        if(!isDomainUsed){
            url = restApi.domain + url;
        }
       // console.log(requestObject)
        return new Promise((resolve,reject)=>{
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: shouldAddAuthorization ? {
                    'Authorization': 'Bearer ' + localStorage.getItem('eduplus_tkn'),
                    'Content-Type': 'application/json'
                } : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestObject)
            })
            .then(Response=>Response.json())
            .then(result=> resolve(result))
            .catch(error=>reject(error))
        }) 
    }
    static getApi(url,authorizationString=false,isDomainUsed = restApi.domainState){
        if(!isDomainUsed){
            url = restApi.domain + url;
        }

        return new Promise((resolve,reject)=>{
            fetch(url,{
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: authorizationString && {
                    'Authorization': 'Bearer ' + localStorage.getItem('eduplus_tkn'),
                }
            })
            .then(Response=>Response.json())
            .then(result=> resolve(result))
            .catch(error=>reject(error))
        })
    }

}
export default restApi;