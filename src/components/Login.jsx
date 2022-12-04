import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {rooturl} from "../config";


function validatedata (data,setMessage) {
    if (data.email === "") {
        setMessage("Email cannot be empty");
        return false;
    }
    if (data.password === "") {
        setMessage("Please Input password in correct format");
        return false;
    }
    // if (data.usertype === "") {
    //     setMessage("User Type cannot be empty");
    //     return false;
    // }
    return true;
}

function Login() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    

    let handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("entered submit");
        // console.log(e)
        let data = new FormData(e.target);
        let rawdata = Object.fromEntries(data.entries());
        // console.log(rawdata);
        // // check form data

        if(validatedata(rawdata,setMessage) === false) return;
        
        try {
            let res = await fetch(rooturl + "users/login", {
              method: "POST",
              credentials: 'include',
              body: JSON.stringify(rawdata),
              headers:{
                'Content-Type': 'application/json',
            }

            })
            console.log(res);
            if (res.status === 200) {
                let resJson = await res.json();
                localStorage.setItem("token", resJson.token);
                setMessage("User Logged In Successfully");
                await(20000);
                if(resJson.user_type === "volunteer") {
                    navigate("/userdashboard");
                }
                else if(resJson.user_type === "admin") {
                    navigate("/admindashboard");
                }
                else if(resJson.user_type === "coordinator") {
                    navigate("/coordinatordashboard");
                }
            }
            else if(res.status === 401) {
                let resJson = await res.json();
                setMessage(String(resJson.message));
            }
            else if(res.status === 401) {
                let resJson = await res.json();
                setMessage(String(resJson.message));
            }

        }  
        catch(err){
            console.log(err);
        }
        }

    return(
        <div>
        <div class="flex justify-center leading-loose">            
            <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit}>
            <p class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login for volunteer Connect</p>
                <div class="relative my-6"></div>
                <label class="block text-sm text-gray-00" htmlFor="email">Email</label>
                <input class="border-indigo-500 w-full px-5 py-1 text-gray-700 bg-gray-200 " 
                type="email" name="email" id="email" placeholder="Email" required />

                <div class="relative my-6"></div>
                <label class="block text-sm text-gray-00 " htmlFor='password'>Password</label>
                <input class="border-blue-500 w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                 name="password" type="password" id='password' placeholder="Password" required />
                
                <div class="relative my-6"></div>
                {/* <div class="relative my-6">
                <select id="usertype" class="border-blue-500 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:bg-white focus:border-blue-500">
        
                    <option value="Volunteer">volunteer</option>
                    <option value="admin">admin</option>
                    <option value="coordinator">coordinator</option>
                </select>
                </div> */}

                {/* Error Message Class after this to embed react usestate */}
                <div class="message">{message ? <p color='red'>{message}</p> : null}</div>

                <button class="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                 type="submit" >Login</button>
                
                    <div class="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4">
                    <h2>New User? Click 
                        <Link to='/register'> <u>Here</u> </Link> 
                        to register</h2>
                    </div> 
                    
            </form>

            
        </div>
        </div>
    )
}
export default Login;