import React,{useState} from "react"
import UserDash from "./UserDash"
import UserShifts from "./UserShifts"
import UserProfile from "./UserProfile"
// import { checktoken }from "../config"
import { useEffect } from "react"
import { rooturl,loader } from "../config"
import Navbar from "./Navbar"



export default function UserDashboard() {
    
    useEffect(() => {
        if(localStorage.getItem('user_type')!=='volunteer'){
            window.location.href = "/login";
            localStorage.clear();
            alert("You are not a Volunteer");
        }
        let token = localStorage.getItem('token');
        fetch(rooturl + '/users/verify/', {
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
            window.location.href = "/login";
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
    <div>
        <Navbar/>
        <div className="flex">
            <aside  aria-label="Sidebar">
                
            <div className="w-40 h-screen bg-blue-800 p-5">
            <ul>
                <li>    
                <button className="my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swap(0)}>Dashboard</button>
                </li>
                <li>
                <button className=" my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swap(1)} >Profile</button>
                </li>
                <li>
                <button className="my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swap(2)} >Shifts</button>
                </li>
            </ul>
            </div>
            </aside>
            <div className="p-7 text-2x1 font-semibold">
                {Component}
            </div>
        </div>
    </div>
  )
}


