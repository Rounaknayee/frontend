export const rooturl =  "http://192.168.6.153:8000/";

export function checktoken() {
    let res =  fetch(rooturl + 'users/verify/', {
                method: "GET",
              credentials: 'include',
              headers:{
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }

    });
    if (res.status === 200) {
        return true;
    } else {
        return false;
    }
}