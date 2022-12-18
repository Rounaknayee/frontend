import { stringify } from 'postcss';
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
    
    var filtered = jobs.filter(
      shift =>
        shift.description.toLowerCase().includes(search.toLocaleLowerCase()) ||
        shift.location.toLowerCase().includes(search.toLocaleLowerCase()) ||
        shift.work_type.toLowerCase().includes(search.toLocaleLowerCase())
      // shift.max_volunteers.includes(search.toLocaleLowerCase())||

      // shift.start_time.includes(search.toLocaleLowerCase()) ||
      // shift.end_time.includes(search.toLocaleLowerCase())
    );
    setJobs(filtered);
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
    <div>welcome to your Dashboard</div>
    <div class="block w-40 h-25 p-6 bg-white border border-gray-200 rounded-lg shadow-md  dark:bg-gray-800 ">
    </div>
    <div className="flex flex-row align-left my-2">
        <input 
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => handlesearch(e.target.value)}
        className="border border-blue-400 text-black-600  p-2"
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
          // const index = data.findIndex(job => job.id === id);
          jobs.map((shifts) => {
              // const {id, start_time, end_time, max_volunteers, work_type, location, description} = job;
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
                    className="bg-red-500 hover:bg-white hover:text-red-500 hover:border hover:border-red-500 text-white font-bold py-2 px-4 rounded"
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