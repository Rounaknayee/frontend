import React, {useEffect} from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import { loader,rooturl} from "../config";
import Profile from './Profile';
import Fileupload from './Fileupload';
import Coordinatorshifts from './Coordinatorshifts';
import Cooordinatorusers from './Cooordinatorusers';

export default function CoordinatorDashboard() {

    const [Component, setComponent] = useState(loader);


    useEffect(() => {
        if(localStorage.getItem('user_type')!=='coordinator'){
            window.location.href = "/login";
            localStorage.clear();
            alert("You are not a Co-ordinator");
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
            setComponent(<Profile/>);
        } else {
            console.log("token is invalid by checktoken");       
            window.location.href = "/login";
        }}).catch((error) => {
            console.log("token is invalid by checktoken");
            console.log(error);
            window.location.href = "/login";
        });
      
    }, [])

    function swapcoordinator(e) {
      if (e===0){
        setComponent(<Profile />)
      }
      else if (e===1){
        setComponent(<Cooordinatorusers/>)

        // setComponent(<Fileupload urlname="/coordinator/upload/"/>)
        // setComponent(<Adminfileupload/>)
      }
      else if (e===2){
        setComponent(<Coordinatorshifts/>)
        // setComponent(<Admingetshifts/>)
      }        
      else if (e===3){
          
      }}
    
  return (
    <div>
    <Navbar/>
    <div className="flex ">
            <aside  aria-label="Sidebar">
                
            <div className="w-40 h-screen bg-blue-800 p-5">
            <ul>
                <li>    
                <button className="my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swapcoordinator(0)}>Profile</button>
                </li>
                <li>
                <button className=" my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swapcoordinator(1)}>My Volunteers</button>
                </li>
                <li>
                <button className="my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800" 
                onClick={()=>swapcoordinator(2)}>Active Shifts</button>
                </li>
                {/* <li>
                <button className="my-10 w-full py-2 text-2x1 rounded font-semibold text-white hover:bg-blue-200 hover:text-blue-800"
                onClick={()=>swapcoordinator(3)}>Profile</button>
                </li> */}
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
