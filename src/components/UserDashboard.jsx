import React,{useState} from "react"
import UserDash from "./UserDash"
import UserShifts from "./UserShifts"
import UserProfile from "./UserProfile"
// import { checktoken }from "../config"
import { useEffect } from "react"
import { rooturl } from "../config"


export default function UserDashboard() {
    // Promise.all([checktoken()]).then((values) => {
    //     console.log(values);
    //     if(values[0] == false) {
    //         window.location.href = "/login";
    //     }
    //     else{
    //         console.log("user logged in");
    //     }
    // });
    let loader = '<div><h1>loader</h1></div>'
    useEffect(() => {
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
            setComponent(<UserDash/>);
        } else {
            console.log("token is invalid by checktoken");       
            window.location.href = "/login";
        }}).catch((error) => {
            console.log("token is invalid by checktoken");
        });
    },[])
    const [Component, setComponent] = useState(loader);

    function swap(e) {
        if (e===0){
            setComponent(<UserDash/>)
        }
        else if (e===1){
            setComponent(<UserProfile/>)
        }
        else if (e===2){
            setComponent(<UserShifts/>)
        }        
    }
 return (
    <div class = "h-full ">
        <aside class="h-full w-64" aria-label="Sidebar">
        <div class="overflow-y-auto py-4 px-3 bg-white-50 dark:bg-gray-800">
        <ul class="space-y-2">
            <li class="px-2 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700">
            <button  onClick={()=>swap(0)} >Dashboard</button>
            </li>
            <li class="px-2 py-1.5 rounded-md {} dark:bg-gray-700">
            <button  onClick={()=>swap(1)} >Profile</button>
            </li>
            <li class="px-2 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700">
            <button onClick={()=>swap(2)} >shifts</button>
            </li>
        </ul>
         
         </div>
         </aside>
         <div>
            {Component}
         </div>
    </div>
  )
}


