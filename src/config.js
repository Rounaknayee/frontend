export const rooturl =  process.env.WEBSITE_URL || "http://192.168.6.153:8000" || "http://localhost:8000";

export function checktoken (){
    let token = localStorage.getItem('token');
    fetch(rooturl + 'users/verify/', {
            method: "GET",
            credentials: 'include',
            headers:{
                'x-access-token': token,
            }

    }).then((res) => {
    if (res.status === 200) {
        console.log("token is valid by checktoken");
        return true;
    } else {
        console.log("token is invalid by checktoken");       
        return false;
    }}).catch((error) => {
        console.log("token is invalid by checktoken");
        return false;
    });
}

export const loader = (<div class="flex items-center justify-center space-x-2 animate-pulse">
    <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
    <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
    <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
</div>);
