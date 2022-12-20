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
        if (rawdata.remember === "on") {
            rawdata.remember = true;
        }
        else {
            rawdata.remember = false;
        }
        console.log(rawdata);
        // // check form data

        if(validatedata(rawdata,setMessage) === false) return;
        
        try {
            let res = await fetch(rooturl + "/users/login", {
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
                console.log(resJson.token);
                setMessage("User Logged In Successfully");
                await(20000);
                localStorage.setItem("user_type", resJson.user_type);
                console.log(resJson.user_type);
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
            else {
                let resJson = await res.json();
                console.log(resJson.error);
                setMessage(String(resJson.error));
            }
            // else if(res.status === 401) {
            //     let resJson = await res.json();
            //     setMessage(String(resJson.message));
            // }

        }  
        catch(err){
            console.log(err);
        }
        }

    return(
        <div>
        <div class="flex justify-center leading-loose">   
                 
            <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit}>
            <div class="w-3/4">
            <img src = "./techimpact_logo.png " alt = "logo" className="align-left w-40 object-contain bg-gray-200 "/>
            </div>
            <p class="mt-3 text-center text-2xl font-bold tracking-tight text-gray-900">Login Here for Volunteer Connect</p>
                
                <label 
                className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
                htmlFor="email">Email</label>
                <input 
                className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="email" name="email" 
                id="email" placeholder="Email" 
                required />

                <label 
                className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1" 
                htmlFor='password'>Password</label>
                <input 
                className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                name="password" type="password" 
                id='password' placeholder="Password" 
                required />

                <div className='mt-2'>
                    <label class="block text-gray-500 font-bold" for="remember">
                        <input class="leading-tight" type="checkbox" id="remember" name="remember"/>
                        <span class="text-sm pl-2">
                            remember me
                        </span>
                    </label>
                </div>
                
                {/* <div class="relative my-6">
                <select id="usertype" class="border-blue-500 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:bg-white focus:border-blue-500">
        
                    <option value="Volunteer">volunteer</option>
                    <option value="admin">admin</option>
                    <option value="coordinator">coordinator</option>
                </select>
                </div> */}

                {/* Error Message Class after this to embed react usestate */}
                
                {message ? 
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <p class="font-bold">{message}</p> 
                </div> : null}

                <button class="shadow mt-3 bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                 type="submit" >Login</button>
                
                    <div class="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mt-3">
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