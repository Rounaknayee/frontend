

import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// API_NAME
const api_name = "https://api.server.test/register";

function validatedata(rawdata,setMessage) {
    let flag = 0, msg = '';
        if(rawdata.registerpassword !== rawdata.confirmregisterpassword){
            flag = 1
            msg+= "Password and Confirm Password do not match "; 
        }
        if(rawdata.age < 18){
            if(flag === 1)msg+=" and ";
            flag=1
            msg+=" You must be 18 years old to register"; 
        }
        if(flag === 1){
            setMessage(msg);
            return true;
        }
        return false;
}

export default function Register() {
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target);
        // Get the form Data
        let data = new FormData(e.target);
        let rawdata = Object.fromEntries(data.entries());
        console.log(rawdata);
        // Validate the passwords and age
        if(validatedata(rawdata,setMessage) === true) return;
        
        setMessage("Processing....");
        try {
            // Actual call to API starts here
            let res = await fetch(api_name, {
              method: "POST",
              body: rawdata,
            })
            let resJson = await res.json();
            if (resJson.status === 200) {
                setMessage("User Registered Successfully");
                // redirect("/dashboard");
            }
            else if(resJson.status === 400) {
                setMessage(String(resJson.message));
            }
        }  
        catch(err){
            console.log(err);
        }

    }
 
     
    return (
        <div>
        <form  onSubmit={handleSubmit} >
            <label htmlFor='registeremail'>Email</label>
            <input 
            type= "email" name="email"
            placeholder="Email" id="registeremail" required  />
            
            <label htmlFor='firstname'>FirstName</label>
            <input 
            type = "text" name="firstname"
            placeholder="FirstName" id="firstname" required/>
            
            <label htmlFor='lastname'>LastName</label>
            <input 
            type = "text" name="lastname"
            placeholder="LastName" id="lastname" required/>

            <label htmlFor='phonenumber'>Number</label>
            <input 
            type = "phone" name="phonenumber"
            placeholder="xxx-xxx-xxxx" id="phonenumber" required/>

            <label htmlFor='address'>Address</label>
            <input 
            type = "text" name="address"
            placeholder="Address" id="address" required/>

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

            <label htmlFor='employeeid'>EmployeeID</label>
            <input 
            type = "text" name='employeeid'
            placeholder="Employee ID" id="employeeid"/>
            
            <label htmlFor='registerpassword'>Password</label>
            <input 
            type = "password" name="registerpassword"
            placeholder="Enter Password" id="registerpassword" required/>

            <label htmlFor='confirmregisterpassword'>ConfirmPassword</label>
            <input 
            type = "password" name='confirmregisterpassword'
            placeholder="Re-enter Password" id="confirmregisterpassword" required/>
            
            <label htmlFor='usertype'>Select Type of User</label>
            <select id="usertype" name="usertype">
                <option value="Volunteer">volunteer</option>
                <option value="admin">admin</option>
                <option value="coordinator">coordinator</option>
            </select>

            <label htmlFor='marketing'>Are you okay with Marketing Emails?</label>
            <select id="marketing" name="marketing">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <button type="submit" id="formsubmitbutton" >Register Me</button>

            {/* Error Message Class after this to embed react usestate */}
            <div className="message">{message ? <p>{message}</p> : null}</div>

        </form>
        <h2>Already a User? Click <Link to='/login'>Here</Link> to Login</h2>
        </div>
    )
}
  
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// export default function App() {
//   return (
    // <Router>
    //   <Switch>
    //     <Route path="/register">
    //       <Register />
    //     </Route>
    //     <Route path="/login">
    //       <Login />
    //     </Route>
    //     <Route path="/">
    //       <Home />
    //     </Route>
    //   </Switch>
    // </Router>
//   );
// }

// let handleSubmit = async (e) => {
    //     e.preventDefault();
        // try {
        //   let res = await fetch("https://httpbin.org/post", {
        //     method: "POST",
        //     body: JSON.stringify({
        //       name: name,
        //       email: email,
        //       mobileNumber: mobileNumber,
        //     }),
        //   });
    //       let resJson = await res.json();
    //       if (res.status === 200) {
    //         console.log("User Registered Successfully");
    //       } 
    //       else if(res.status === 400) {

    //       }
    //       else {
    //         setMessage("Some error occured");
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
