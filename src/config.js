export const rooturl =  "http://192.168.6.153:8000/";

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