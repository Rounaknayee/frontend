import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { rooturl } from '../config';


export default function UserDash() {
  // const[]
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  const handledeletejob = async(id) => {
    let response = await fetch(`${rooturl}users/deleteshift/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers:{
          'x-access-token': localStorage.getItem('token'),
          }
        })
    console.log(response);
    let data = response.json();
    console.log(data);
    if (response.status === 200) {
      setData(data.filter(job => job.id !== id));
    }
    else {
      console.log("error");
      setMessage("error");
    }
  }
  

  const fetchfromdb = async() => {
    let response = await fetch(`${rooturl}/shifts/getshifts`, {
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
      setData(data.shifts);
    }
    else if (response.status === 200 && data.length === 0) {
      setData([]);
      setMessage("No shifts assigned to user yet!");

    }
    else {
      console.log("error");
      setMessage("error");
    }
  }

  useEffect(() => {
    fetchfromdb();
  }, [])

  return (
    <div>
    <div>welcome to your Dashboard</div>
    <div class="block w-40 h-25 p-6 bg-white border border-gray-200 rounded-lg shadow-md  dark:bg-gray-800 ">
    </div>
    <table class="table-auto">
      <thead>
          <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Job Type</th>
              <th>Hours</th>
          </tr>
      </thead>
      <tbody>
        { data > 0 ? (
          data.map(job => {
              const {id, date, time, location, jobtype, hours} = job;
              return (
                <tr>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td>{location}</td>
                    <td>{jobtype}</td>
                    <td>{hours}</td>
                    <td>
                        <button onClick={handledeletejob(id)}>Cancel shift</button>
                    </td>
                </tr>
              )
          })
      ) : (
        <tr>
          <td colSpan={5}>No Jobs Assigned to user Yet!</td>
        </tr>
      )   
      }
      </tbody>
  </table>
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    {message ? <p class="font-bold">{message}</p> : null}
  </div>
  </div>
  )
}