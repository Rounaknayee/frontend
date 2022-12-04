import React,{useState} from "react"
import UserDash from "./UserDash"
import UserShifts from "./UserShifts"
import UserProfile from "./UserProfile"
import { checktoken } from "../config"


export default function UserDashboard() {
    if(checktoken())console.log("Token is valid");
    else{
        console.log("Token is not valid");
        window.location.href = "/login";
    } 
    const [Component, setComponent] = useState(<UserDash/>);

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


