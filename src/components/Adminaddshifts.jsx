import React from 'react'
import { useState } from 'react';
import {rooturl} from '../config';

function Adminaddshifts() {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [Date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [maxVolunteers, setMaxVolunteers] = useState('');
    const [worktype, setWorktype] = useState('carpentry');
    const [Description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('green');
  
    const handleSubmit = async(event) => {
      // prevent default form submission
      event.preventDefault();

      try {

        // Perform authentication here
        const response = await fetch(rooturl + '/shifts/addshift', {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                start_time: startTime,
                end_time: endTime,
                date: Date,
                location: location,
                max_volunteers: maxVolunteers,
                work_type: worktype,
                description: Description,
            })
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            // redirect to dashboard
            console.log("Shift added successfully");
            setColor('bg-green-100 border border-green-400 text-green-700');
            setMessage("Shift added successfully");
            // history.push('/adminaddshifts');
        }
        else if(response.status === 401){
            // console.log(error);
            setColor('bg-red-100 border border-red-400 text-red-700');
            setMessage(data);
            // setMessage("error");
        }
        else if(response.status === 422){
            // console.log(error);
            setColor('bg-red-100 border border-red-400 text-red-700');
            setMessage(data.error);
            // setMessage("error");
        }

        
      } catch (error) {
        console.log(error);
        setColor('bg-red-100 border border-red-400 text-red-700');
        // setMessage(error);        
      }
    };

  return (
    <div>
        <h1 className="text-3xl text-center text-green-600 font-bold">Add Shift</h1>
        <form onSubmit={handleSubmit} className="mt-4 w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1"
            htmlFor="start-time"
          >
            Start Time
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="start-time"
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          required />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1"
            htmlFor="end-time"
          >
            End Time
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="end-time"
            type="time"
            step={900}
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          required />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1"
            htmlFor="day-of-week"
          >
            Day of Week
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="day-of-week"
            type="date"
            placeholder="03/07/1999"
            value={Date}
            onChange={(event) => setDate(event.target.value)}
          required/>
          </div>
          <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1"
            htmlFor="max-volunteers"
          >
            Max Volunteers
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="max-volunteers"
            type="number"
            max={20}
            min={1}
                       
            placeholder="Greater than 0"
            value={maxVolunteers}
            onChange={(event) => setMaxVolunteers(event.target.value)}
          required/>
          </div>
          <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="location"
            type="text"
            placeholder="1, Street Name, Apt."
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required />
          </div>
          <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1"
            htmlFor="work-type"
          >
            Location
          </label>
          <select
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="work-type"
            type="text"
            placeholder="Greater than 0"
            value={worktype}
            onChange={(event) => setWorktype(event.target.value)}
          >
            <option value="carpentry">Carpentry</option>
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="painting">Painting</option>
            <option value="cleaning">Cleaning</option>
            <option value="administrative">Administrative</option>
            </select>
          </div>
          <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-blue-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="description"
            type="text"
            minLength={1}
            maxLength={255}
            placeholder="Description of Work to be Done (Max 255 Characters.)"
            value={Description}
            onChange={(event) => setDescription(event.target.value)}
            required />
          </div>
            <div className="w-full mt-4 px-3">
          {message ? 
                <div className={` ${color} px-4 py-3 rounded relative`}>
                <p class="font-bold">{message}</p> 
                </div> : null} 
                </div>         
          <button className="ml-3 mt-3 px:3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Submit
            </button>
          </div>

        </form>   
    </div>
  )
}

export default Adminaddshifts