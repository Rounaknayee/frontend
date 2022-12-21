
import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { rooturl } from '../config';
import Forgotpassword from './Forgotpassword';


function Profile() {

    const [message, setMessage] = useState('');
    const [color, setColor] = useState('red');
    const [profile, setProfile] = useState({
        email: '',
        name: '',
        phone: '',
        address: '',
        city: '',
        age: '',
        state: '',
        zip: '',
        country: '',
        company: '',
        employee_id: '',
        marketing: 'true',
    });

    const updatedetails = async(e) => {
        e.preventDefault();
        console.log(e)
        console.log("logged e")
        let data = new FormData(e.target);
        let rawdata = Object.fromEntries(data.entries());
        if(rawdata.marketing === "true")  rawdata.marketing = true;
        else rawdata.marketing = false;
        console.log(rawdata);
        console.log("logged rawdata")

        let response = await fetch(`${rooturl}/users/updateprofile`, {
            method: "POST",
            credentials: 'include',
            headers:{
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(rawdata),

        })
        console.log(response);
        const res = await response.json();
        console.log(res);
        console.log("idrtak response")
        if (response.status === 200) {
            setColor("green");
            setProfile(res);
            setMessage("Profile updated");
        }
        else if ( response.status === 401 ) {
            console.log("Entered 401")
            setColor("red");
            setMessage(res.error);
        }
        else if (response.status === 422){
            console.log("Entered 422")
            setColor("red");
            setMessage(res.error);
        }
        else {
            setColor("red");
            console.log("error");
            setMessage("Error updating profile");
        }
    }  



    const fetchprofile = async() => {
        let response = await axios({
            method: 'get',
            url: `${rooturl}/users/getprofile`,
            withCredentials: true,
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        console.log(response);
        let userdata = await response.data;
        console.log(userdata.user);
        if (response.status === 200) {
            setColor("green");
            setProfile(userdata.user);
            setMessage("Profile fetched");
        }
        else if (response.status === 400 || response.status === 422 || response.status === 401 || response.status === 404) {
            setColor("red");
            setMessage(userdata.error);
        }
        else {
            setColor("red");
            console.log("error");
            setMessage("Error fetching profile");
        }
    }

    useEffect(() => {

        fetchprofile();
      
    }, [])
    


  return (
    <>
    <div
    className='text-center text-2xl font-bold text-green-600 '
    >Profile Update</div>
    <div className="flex justify-center leading-loose">

        <form className="" onSubmit={updatedetails}>
        
        <div class="flex flex-wrap">
            <div className='w-1/2 px-2'>
            <label 
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='registeremail'>Email</label>
            <input 
            className="hover:bg-red-200 appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            // class=" border-indigo-500 px-5 py-1 text-gray-700 bg-gray-200 rounded"
            type= "email" 
            name="email"
            disabled = "true"
            value={profile.email}
            placeholder="Email" 
            id="registeremail"
            required/>
            </div>
            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='profilename'>Name</label>
            <input
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            // class=" border-indigo-500 px-5 py-1 text-gray-700 bg-gray-200 rounded"
            type= "text"
            name="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Name"
            id="profilename"
            required/>
            </div>
            <div className='w-1/2 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='profilephone'>Phone</label>
            <input
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            // class=" border-indigo-500 px-5 py-1 text-gray-700 bg-gray-200 rounded"
            type= "text"
            name="phone"
            placeholder="Phone"
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            value={profile.phone}
            id="profilephone"
            required/>
            </div>

            <div className='w-1/4 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='age'>Age</label>
            <input 
            className="hover:bg-red-200 appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="age"
            disabled="true" 
            value = {profile.age}
            placeholder="years" id="age" 
            required/>
            </div>

            <div className='w-1/4 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
             htmlFor='employee_id'>Type of User</label>
            <input 
            className="hover:bg-red-200 appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name='user_type'
            disabled = "true" value = {profile.user_type}
            placeholder="User Type" id="user_type"/>
            </div>

            <div className='w-full px-2'>
            <label 
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='profileaddress'>Address</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="address"
            value = {profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            placeholder="Address" id="profileaddress" required/>
            </div>

            <div className='w-1/4 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='city'>City</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="city"
            value = {profile.city}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            placeholder="CITY" id="city" required/>
            </div>

            <div className='w-1/4 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor="state">State</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="state"
            value = {profile.state}
            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
            placeholder="STATE" id="state" required/>
            </div>

            <div className='w-1/4 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='zip'>Zip</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "number" name="zip"
            value = {profile.zip}
            onChange={(e) => setProfile({ ...profile, zip: e.target.value })}
            placeholder="xxxxxx" id="zip" required/>
            </div>
            
            <div className='w-1/4 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='country'>Country</label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="country"
            value = {profile.country}
            onChange={(e) => setProfile({ ...profile, country: e.target.value })}
            placeholder="country" id="country" required/>
            </div>

            
            <div className='w-1/3 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='company'>Company</label>
            <input 
            className="hover:bg-red-200 appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name="company"
            disabled = "true" value = {profile.company}
            placeholder="Company Name" id="company"/>
            </div>

            <div className='w-1/3 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
             htmlFor='employee_id'>Employer ID</label>
            <input 
            className="hover:bg-red-200 appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type = "text" name='employee_id'
            disabled = "true" value = {profile.employee_id}
            placeholder="Employee ID" id="employee_id"/>
            </div>

            
            
            <div className='w-1/3 px-2'>
            <label
            className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
            htmlFor='marketing'>Recieve Marketing Emails?</label>
            <select 
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            value={profile.marketing}
            onChange={(e) => setProfile({ ...profile, marketing: e.target.value })}
            id="marketing" name="marketing">
                <option
                value="true"
                >Yes</option>
                <option
                value="false"
                >No</option>
            </select>
            </div>

            <div className='w-1/3 px-2 my-3'>
            <button 
            class="py-2 h-full shadow w-full bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold  rounded" 
            type="submit" id="formsubmitbutton" >Update Details</button>
            </div>
            <div className='w-2/3 px-2 my-3'>

            {message ? 
            <div className={`bg-${color}-100 border border-${color}-400 text-${color}-700  px-4 py-3 rounded relative text-center`}>
            <p class="font-bold">{message}</p>
            </div>
            : null}
            </div>


        </div>
    </form>
    
    </div>
        <Forgotpassword />
    </>
    
  )
}

export default Profile