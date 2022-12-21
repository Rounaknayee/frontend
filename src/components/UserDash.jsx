
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { rooturl } from '../config';


export default function UserDash() {
  
  const [jobs, setJobs] = useState([]);
  const [color, setColor] = useState("red");
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const handlesearch = (e) => {
    setSearch(e);
    console.log(search);
  }
  
  const handledeletejob = async(id) => {
    let response = await fetch(`${rooturl}/shifts/dropjob/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers:{
          'x-access-token': localStorage.getItem('token'),
          }
        })
    console.log(response);
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setColor("green");
      setJobs(jobs.filter(job => job.id !== id));
      setMessage("Deleted Job");
    }
    else if (response.status === 400 || response.status === 401 || response.status === 404) {
      setColor("red");
      setMessage(data.error);
    }
    else {
      setColor("red");
      console.log("error");
      setMessage("Error deleting shift");
    }
  }
  

  const fetchfromdb = async() => {
    let response = await fetch(`${rooturl}/shifts/getjobs`, {
      method: "GET",
      credentials: 'include',
            headers:{
                'x-access-token': localStorage.getItem('token'),
                }
      })
    
    console.log(response);
    let data = await response.json();
    data = data.shifts
    console.log("Ye dekho json");
    console.log(data);
    if (response.status === 200 && data.length > 0) {
      console.log("updating data");
      setColor("green");
      setJobs(data);
    }
    else if (response.status === 200 && data.length === 0) {
      setJobs([]);
      setColor("red");
      setMessage("No shifts assigned to user yet!");

    }
    else {
      console.log("error");
      setColor("red");
      setMessage("error");
    }
  }

  useEffect(() => {
    fetchfromdb();
  }, [])

  return (
    <div >
    
    
    <div className="flex flex-row align-left my-2">
        <input 
        type="text"
        placeholder="Search Here"
        value={search}
        onChange={handlesearch}
        className="border border-blue-400 text-black-600 w-full p-2"
        />
        <button
        className="bg-blue-600 text-white ml-5 p-2 rounded hover:bg-blue-700"
        onClick={fetchfromdb}
        >Refresh</button>

    </div>
    <table class="table-auto my-2">
      <thead>
      <tr>
                <th
                className="border border-blue-400  w-1/12 p-2"
                >Shift ID</th>

                <th
                className="border border-blue-400  w-1/12 p-2"
                >Start Time</th>

                <th
                className="border border-blue-400  w-1/12 p-2"
                >End Time</th>

                <th
                className="border border-blue-400  w-1/12 p-2"
                >Max Volunteers</th>

                <th
                className="border border-blue-400  w-1/12 p-2"
                >Work Type</th>

                <th
                className="border border-blue-400  w-1/12 p-2"
                >Location</th>

                <th
                className="border border-blue-400  w-3/12 p-2"
                >Description</th>

                <th
                className="border border-blue-400  w-1/12 p-2"
                >Drop Job</th>     
          </tr>
      </thead>
      <tbody>
        { jobs.length > 0 ? (
          jobs.filter(
            jobs =>
            jobs.work_type.toLowerCase().includes(search.toLowerCase()) ||
            jobs.location.toLowerCase().includes(search.toLowerCase()) ||
            jobs.description.toLowerCase().includes(search.toLowerCase()) ||
            jobs.start_time.toString().includes(search.toLowerCase()) ||
            jobs.end_time.toString().includes(search.toLowerCase())||
            jobs.max_volunteers.toString().includes(search.toLowerCase())

          ).map((shifts) => {
              return (
                <tr>
                    <td
                    className="border border-blue-400  w-1/12 p-2"
                    >{shifts.id}</td>

                    <td
                    className="border border-blue-400  w-1/12 p-2"
                    >{shifts.start_time}</td>

                    <td
                    className="border border-blue-400  w-1/12 p-2"
                    >{shifts.end_time}</td>

                    <td
                    className="border border-blue-400  w-1/12 p-2"
                    >{shifts.max_volunteers}</td>

                    <td
                    className="border border-blue-400  w-1/12 p-2"
                    >{shifts.work_type}</td>

                    <td
                    className="border border-blue-400  w-1/12 p-2"
                    >{shifts.location}</td>

                    <td
                    className="border border-blue-400  w-3/12 p-2"
                    >{shifts.description}</td>

                    <td
                    className="border border-blue-400  w-1/12 p-2"
                    >
                      
                    <button 
                    className="bg-red-500 border hover:bg-white hover:text-red-500 hover:border hover:border-red-500 text-white font py-2 px-4 rounded"
                    onClick={() => handledeletejob(shifts.id)}> 
                    Drop Job 
                    </button>
                    </td> 
                  </tr>


              )
          })
      ) : (
        <tr>
          <td colSpan={7}>No Jobs Assigned to user Yet!</td>
        </tr>
      )   
      }
      </tbody>
  </table>
  {message ? 
    <div className={`bg-${color}-100 border border-${color}-400 text-${color}-700  px-4 py-3 rounded relative`}>
    <p class="font-bold">{message}</p>
    </div>
     : null}
  </div>
  )
}