import axios from 'axios';
import React from 'react'
import {rooturl} from '../config';

function Navbar() {

    const handlelogout = async() => {
        let response = await axios(rooturl+"/users/logout",{
            method: "GET",
            credentials: 'include',
            headers:{
                'x-access-token': localStorage.getItem('token'),
                }
        })
        console.log(response);  
        if (response.status === 200) {
            console.log("logout successful");
            localStorage.clear();
            window.location.href = "/login";
            alert("Logged out successfully");
        } else {
            console.log("Logout failed");
            alert("Logout failed");
        }

        
    }
  return (
    <div >
        <nav
        class="flex bg-white shadow border-solid py-4 border-t-2 border-blue-700">
        <div className="w-3/4">
        <img src = "./techimpact_logo.png " alt = "logo" className="align-left ml-5  w-40 object-contain bg-gray-200 "/>
        </div>
        <div className="item-end">

            <div className="flex align-right">
                <button onClick={handlelogout}
                   className="block align-right px-4 py-2 rounded border text-blue-700 font-bold hover:text-white hover:bg-blue-700 "
                   id= "logout-button">logout</button>
            </div>
        </div>    
        </nav>
    </div>
  )
}

export default Navbar