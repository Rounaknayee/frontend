import React from 'react'
import { useState } from 'react';
import { rooturl } from '../config';
import {useRef } from 'react';

function Forgotpassword() {
  const formRef = useRef();

  
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('red');
  

  const handlechangepassword = async(e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let rawdata = Object.fromEntries(data.entries());
    console.log(rawdata);

    let response = await fetch(`${rooturl}/users/updatepassword`, {
      method: "POST",
      credentials: 'include',
      headers:{
        'x-access-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rawdata)
    })
    console.log(response);
    let res = await response.json();
    console.log(data);
    if (response.status === 200) {
      setColor("green");
      formRef.current.reset();     
      setMessage("Password updated");
    }
    else if (response.status === 422 || response.status === 401) {
      setColor("red");
      setMessage(res.error);
    }
    else {
      setColor("red");
      console.log("error");
      setMessage("Error updating password");
    }



  }



    // if (!(password === confirmPassword)) {





  return (
    <div >
      <div
      className='text-center text-2xl font-bold text-green-600'>Update Password</div>
      <form className="flex flex-wrap "  onSubmit={handlechangepassword} ref={formRef}  >
        <div className='w-1/4 px-2'>
        <label
        className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
        htmlFor='password'>CurrentPassword</label>
        <input 
        className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type = "password" name="old_password"
        ref = {useRef()}
        placeholder="Enter Password" id="currentpassword" required/>
        </div>

        <div className='w-1/4 px-2'>
        <label
        className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
        htmlFor='password'>New Password</label>
        <input 
        className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type = "password" name="new_password"
        placeholder="Enter Password" id="newpassword" required/>
        </div>

        <div className='w-1/4 px-2'>
        <label
        className="block uppercase tracking-wide text-blue-700 text-xs font-bold mt-2 mb-1"
        htmlFor='password'>Confirm New Password</label>
        <input 
        className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type = "password" name="new_password_confirm"
  

        placeholder="Enter Password" id="confirmnewpassword" required/>
        </div>

        <div className='w-1/4 px-2 my-4'>
        <button 
        class="py-2 mt-2 h-full shadow w-full bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold  rounded" 
        type="submit" id="passwordsubmitbutton" >Update Password</button>
        </div>

        <div className='w-full px-2 my-3'>
        {message ? 
        <div className={`bg-${color}-100 border border-${color}-400 text-${color}-700  px-4 py-3 rounded relative text-center`}>
        <p class="font-bold">{message}</p>
        </div>
        : null}
        </div>


        

        </form>



    </div>
  )
}

export default Forgotpassword