import React from 'react';
import {
    Link
  } from "react-router-dom";
  
function Home() {

    const abouttext = (
        "We are the place nonprofits can call to make sense of anything from large-scale technology projects, to technology maintenance and support. We have partnered with hundreds of nonprofit organizations around the world since 2003, to help each one realize the potential of technology to achieve their mission and improve outcomes"
    )
    return(
        <div>
            <nav
            class="fixed w-full bg-white shadow-2xl border-solid py-4 border-b-2 border-blue-700">
            <div className="w-3/4">
            <img src = "./techimpact_logo.png " alt = "logo" className="align-left ml-5  w-40 object-contain bg-gray-200 "/>
            </div>
            </nav>


            <div className="bg-white  flex flex-col justify-center items-center">
            <h1 className="mt-32 text-3xl font-bold text-gray-800 mb-6 animate-text bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Welcome to Our Volunteer Connect!</h1>

            <div className="mt-6 mx-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">About</h2>
            <p className="text-gray-600 leading-loose">
                {abouttext}            
            </p>
            <h6 className="text-1xl font-bold text-gray-800 mb-2 mt-5">At Tech Impact, we:</h6>
            <div className="ml-8 mr-12 mb-10 mt-5">
            <li className='text-gray-600'>
            Maintain and deploy a comprehensive suite of products and services that focus solely on the needs of nonprofits.
            </li>
            <li className='text-gray-600'>
            Maintain a network of experts that can help a nonprofit overcome almost any technology challenge, providing affordable expertise in strategic technology planning, project management, database and application development.

            </li>
            <li className='text-gray-600'>
            Provide technology support to nonprofits. Through our Managed IT Services, we can implement and support an organization’s entire technology infrastructure, either in the cloud or on premise.
                           
            </li>
            <li className='text-gray-600'>
            Ensure that nonprofits receive every software and product discount available. We accomplish this through our deep partnerships with nonprofits like TechSoup Global and corporations like Microsoft.
            </li>
            <li className='text-gray-600'>
            Help young urban adults move into a career in IT through our ITWorks program. This award winning 16- week program gives them the training, certifications, and experience they need to compete for entry level IT positions.               
            </li>
            </div>
            </div>
            <div className="flex justify-between w-64">

            <Link to='/register'>
            <button type="button" class="text-white bg-gradient-to-tr from-green-600 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Register
            </button>
            </Link>
            <Link to='/login'>
            <button type="button" class="text-white bg-gradient-to-tr from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Login
            </button>
            </Link>
            </div>
            </div>
            <footer class="fixed bottom-0 shadow-2xl w-full h-18 bg-white border-solid border-t-2 border-blue-700 p-5 align-center">
                <p className="text-center text-gray-500 text-1xl">
                    &copy;2022 Tech Impact. All rights reserved.
                </p>
            </footer>
        </div>
    )
}
export default Home;