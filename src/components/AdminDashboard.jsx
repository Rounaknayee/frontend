import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { loader,rooturl} from "../config";
import Adminfileupload from "./Adminfileupload";
import Adminaddshifts from "./Adminaddshifts";
import Navbar from "./Navbar";
import Admingetshifts from "./Admingetshifts";
import Profile from "./Profile";



export default function AdminDashboard() {


    const [Component, setComponent] = useState(loader);
    
    useEffect(() => {
        console.log(localStorage.getItem('user_type'));

        if(localStorage.getItem('user_type')!=="admin"){
            window.location.href = "/login";
            localStorage.clear();
            alert("You are not an admin");
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
            setComponent(<Adminaddshifts/>);
        } else {
            console.log("token is invalid by checktoken");       
            window.location.href = "/login";
        }}).catch((error) => {
            console.log("token is invalid by checktoken");
            window.location.href = "/login";
        });
    },[])

    function swapadmin(e) {
        if (e===0){
            setComponent(<Adminaddshifts/>)
        }
        else if (e===1){
            setComponent(<Adminfileupload/>)
        }
        else if (e===2){
            setComponent(<Admingetshifts/>)
        }        
        else if (e===3){
            setComponent(<Profile />)
        }
    }
    return (
        <div>
        <Navbar />
        <div className="flex ">
            <aside  aria-label="Sidebar">
                
            <div className="w-40 h-screen bg-blue-800 p-5">
            <ul>
                <li>    
                <button className="my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swapadmin(0)}>Add shifts</button>
                </li>
                <li>
                <button className=" my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swapadmin(1)}>Upload Shifts</button>
                </li>
                <li>
                <button className="my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swapadmin(2)}>Active Shifts</button>
                </li>
                <li>
                <button className="my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800"
                onClick={()=>swapadmin(3)}>Profile</button>
                </li>
            </ul>
            </div>
            </aside>
            <div className="p-7 text-2x1 font-semibold">
                {Component}
            </div>
        </div>
        



        {/* <Fileupload /> */}

              

        </div>
    );
    }