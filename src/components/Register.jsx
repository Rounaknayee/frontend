import React from 'react'
import { useState } from 'react'
import { Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {rooturl} from "../config.js";

// API_NAME
const register_api = rooturl+"/users/register";

function validatedata(rawdata,setMessage) {
    let flag = 0, msg = '';
        if(rawdata.password !== rawdata.confirmregisterpassword){
            flag = 1
            msg+= "Password and Confirm Password do not match "; 
        }
        if((rawdata.age < 18) || (rawdata.age > 140)){
            if(flag === 1)msg+=" and ";
            flag=1
            msg+=" You must be between 18 and 140 years old to register"; 
        }
        if(flag === 1){
            setMessage(msg);
            return true;
        }
        return false;
}

export default function Register() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target);
        // Get the form Data
        let data = new FormData(e.target);
        let rawdata = Object.fromEntries(data.entries());
        if(rawdata.marketing === "true")  rawdata.marketing = true;
        else rawdata.marketing = false;
        
        // console.log(rawdata);
        // Validate the passwords and age, if True then set message of errror

        if(validatedata(rawdata,setMessage) === true) return;
        delete rawdata.confirmregisterpassword;
        setMessage("Registering....");
        try {
            // Actual call to API starts here
            console.log("Calling API");
            console.log(JSON.stringify(rawdata));

            let res = await fetch(register_api ,  {
            // credentials: 'include',
            // mode: 'no-cors',
              method: "POST",
              body: JSON.stringify(rawdata),
              headers:{
                    'Content-Type': 'application/json'
                }
            })
            console.log(res);

            if (res.status === 200) {
                let resJson = await res.json();
                console.log(resJson);
                setMessage("User Registered Successfully, Please Login Now at Login Page");
                alert("User Registered Successfully, Please Login Now at Login Page");
                await(2000);
                navigate("/login");
            }
            else if(res.status === 401) {
                let resJson = await res.json();
                // let str1 = resJson.message+"\n";
                // let  str2 = resJson.errors;
                // for (const [key, value] of Object.entries(str2)) {
                //     str1 += key + " : " + value + "\n";
                // }             
                setMessage(String(resJson.error));

            }
            else if(res.status === 500) {
                setMessage("Server Error");

            }
            else if(res.status === 422) {
                let resJson = await res.json();
                setMessage(String(resJson.error));
            }
            else{
                console.log("kuch toh error hai");
                setMessage("Unhandled Exception");
            }
        }  
        catch(err){
            console.log(err);
            // setMessage(err);
        }

    }
 
     
    return (
        <div class="flex justify-center leading-loose">
        
        <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl"  onSubmit={handleSubmit} >
        <p class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register Here for Volunteer Connect</p>
        <div class="flex flex-wrap">
            <div className='w-1/2 px-2'>
            <label 
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='registeremail'>Email</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            // class=" border-indigo-500 px-5 py-1 text-gray-700 bg-gray-200 rounded"
            type= "email" 
            name="email"
            placeholder="Email" 
            id="registeremail"
            required/>
            </div>

            <div className='w-1/2 px-2'>
            <label 
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='name'>Name</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" 
            name="name"
            placeholder="FirstName"
            id="name" 
            required/>
            </div>
            
            {/* <label htmlFor='lastname'>LastName</label>
            <input 
            type = "text" name="lastname"
            placeholder="LastName" id="lastname" required/> */}

            <div className='w-1/2 px-2'>
            <label 
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='phone'>Number</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "phone" name="phone"
            placeholder="xxx-xxx-xxxx" id="phone" required/>

            </div>
            
            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='age'>Age</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "number" name="age"
            placeholder="18 Years Minimum" id="age" 
            required/>
            </div>

            <div className='w-full px-2'>
            <label 
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='address'>Address</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="address"
            placeholder="Address" id="address" required/>
            </div>

            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='city'>City</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="city"
            placeholder="CITY" id="city" required/>
            </div>

            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor="state">State</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="state"
            placeholder="STATE" id="state" required/>
            </div>

            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='zip'>Zip</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "number" name="zip"
            placeholder="xxxxxx" id="zip" required/>
            </div>
            
            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='country'>Country</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="country"
            placeholder="country" id="country" required/>
            </div>

            
            <div className='w-1/3 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='company'>Company</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="company"
            placeholder="Company Name" id="company"/>
            </div>

            <div className='w-1/3 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
             htmlFor='employee_id'>EmployeeID</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name='employee_id'
            placeholder="Employee ID" id="employee_id"/>
            </div>

            <div className='w-1/3 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='user_type'>Select Type of User</label>
            <select 
            className='appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
            id="user_type" name="user_type">
                <option value="volunteer">volunteer</option>
                <option value="admin">admin</option>
                <option value="coordinator">coordinator</option>
            </select>
            </div>
            
            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='password'>Password</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "password" name="password"
            placeholder="Enter Password" id="password" required/>
            </div>

            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='confirmregisterpassword'>ConfirmPassword</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "password" name='confirmregisterpassword'
            placeholder="Re-enter Password" id="confirmregisterpassword" required/>
            </div>

            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            
            htmlFor='marketing'>Do you want to recieve Marketing Emails?</label>
            <select id="marketing" name="marketing">
                <option value="true" >Yes</option>
                <option value="false">No</option>
            </select>
            </div>

            <div className='w-1/2 p-2'>
            <button 
            class=" h-full shadow w-full bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold  rounded" 
            type="submit" id="formsubmitbutton" >Register Me</button>
            </div>
            </div>

            {/* Error Message Class after this to embed react usestate */}
            <div class="message">{message ? <p color='red'>{message}</p> : null}</div>

            <h2>Already a User? Click <Link to='/login'>Here</Link> to Login</h2>

        </form>
        
        </div>
    )
}