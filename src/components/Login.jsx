import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return(
        <div>
        <h2 class="font-semibold text-3xl mb-5">Login Here</h2>
        <div class="flex justify-center leading-loose">
            
            <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
            <p>
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login for volunteer Connect</h2>
            </p>
                <div class="relative my-6"></div>
                <label class="block text-sm text-gray-00" htmlFor="loginemail">Email</label>
                <input class="border-indigo-500 w-full px-5 py-1 text-gray-700 bg-gray-200 " type="email" id="loginemail" placeholder="Email" required />
                <div class="relative my-6"></div>
                <label class="block text-sm text-gray-00 " htmlFor='loginpassword'>Password</label>
                <input class="border-blue-500 w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="password" id='loginpassword' placeholder="Password" required />
                
                <div class="relative my-6">
                <select id="usertype" class="border-blue-500 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:bg-white focus:border-blue-500">
        
                    <option value="Volunteer">volunteer</option>
                    <option value="admin">admin</option>
                    <option value="coordinator">coordinator</option>
                </select>
                </div>

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