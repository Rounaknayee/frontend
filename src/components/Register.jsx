import React from 'react'
import { useState } from 'react'
import { Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {rooturl} from "../config.js";

// API_NAME
const register_api = rooturl+"api/user/register";

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
        
        setMessage("Registering....");
        try {
            // Actual call to API starts here
            console.log("Calling API");
            console.log(rawdata);
            let res = await fetch(register_api ,  {
              method: "POST",
              body: JSON.stringify(rawdata),
              headers:{
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 200) {
                let resJson = await res.json();
                console.log(resJson);
                setMessage("User Registered Successfully, Please Login Now at Login Page");
                await(2000);
                navigate("/login");
            }
            else if(res.status === 422) {
                let resJson = await res.json();
                let str1 = resJson.message+"\n";
                let  str2 = resJson.errors;
                for (const [key, value] of Object.entries(str2)) {
                    str1 += key + " : " + value + "\n";
                }             
                setMessage(String(str1));

            }
            else if(res.status === 500) {
                setMessage("Server Error");
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
        <div class="grid grid-cols-2">
            {/* <label htmlFor='registeremail'>Email</label> */}
            <input class=" border-indigo-500 w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            type= "email" name="email"
            placeholder="Email" id="registeremail" required  />
            
            {/* <label htmlFor='name'>Name</label> */}
            <input class=" border-indigo-500 w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            type = "text" name="name"
            placeholder="FirstName" id="name" required/>
            
            {/* <label htmlFor='lastname'>LastName</label>
            <input 
            type = "text" name="lastname"
            placeholder="LastName" id="lastname" required/> */}

            <label htmlFor='phone'>Number</label>
            <input 
            type = "phone" name="phone"
            placeholder="xxx-xxx-xxxx" id="phone" required/>

            <label htmlFor='address'>Address</label>
            <input 
            type = "text" name="address"
            placeholder="Address" id="address" required/>

            <label htmlFor='city'>City</label>
            <input 
            type = "text" name="city"
            placeholder="CITY" id="city" required/>

            <label htmlFor="state">State</label>
            <input 
            type = "text" name="state"
            placeholder="STATE" id="state" required/>

            <label htmlFor='zip'>Zip</label>
            <input 
            type = "number" name="zip"
            placeholder="xxxxxx" id="zip" required/>

            <label htmlFor='country'>Country</label>
            <input 
            type = "text" name="country"
            placeholder="country" id="country" required/>

            <label htmlFor='age'>Age</label>
            <input 
            type = "number" name="age"
            placeholder="18 Years Minimum" id="age" required/>

            <label htmlFor='company'>Company</label>
            <input 
            type = "text" name="company"
            placeholder="Company Name" id="company"/>

            <label htmlFor='employee_id'>EmployeeID</label>
            <input 
            type = "text" name='employee_id'
            placeholder="Employee ID" id="employee_id"/>
            
            <label htmlFor='password'>Password</label>
            <input 
            type = "password" name="password"
            placeholder="Enter Password" id="password" required/>

            <label htmlFor='confirmregisterpassword'>ConfirmPassword</label>
            <input 
            type = "password" name='confirmregisterpassword'
            placeholder="Re-enter Password" id="confirmregisterpassword" required/>
            
            <label htmlFor='user_type'>Select Type of User</label>
            <select id="user_type" name="user_type">
                <option value="volunteer">volunteer</option>
                <option value="admin">admin</option>
                <option value="coordinator">coordinator</option>
            </select>

            <label htmlFor='marketing'>Do you want to recieve Marketing Emails?</label>
            <select id="marketing" name="marketing">
                <option value="true" >Yes</option>
                <option value="false">No</option>
            </select>

            <button class="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
            type="submit" id="formsubmitbutton" >Register Me</button>
            </div>

            {/* Error Message Class after this to embed react usestate */}
            <div class="message">{message ? <p color='red'>{message}</p> : null}</div>

            <h2>Already a User? Click <Link to='/login'>Here</Link> to Login</h2>

        </form>
        
        </div>
    )
}