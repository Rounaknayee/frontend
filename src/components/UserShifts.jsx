import React from 'react'
import { useState, useEffect } from 'react';


import { rooturl,loader } from '../config'

export default function UserShifts() {
  // const[]
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  // const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [color, setColor] = useState('red');
  var qdata = '';

  const handlesearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
    console.log("Ye hai actual data")
    console.log(data)
    console.log("Ye hai Query Data")
    console.log(qdata)
    qdata = data
    var filtered = qdata.filter(
      shift =>
        shift.description.toLowerCase().includes(search.toLocaleLowerCase()) ||
        shift.location.toLowerCase().includes(search.toLocaleLowerCase()) ||
        shift.work_type.toLowerCase().includes(search.toLocaleLowerCase())
      // shift.max_volunteers.includes(search.toLocaleLowerCase())||
      // shift.start_time.includes(search.toLocaleLowerCase()) ||
      // shift.end_time.includes(search.toLocaleLowerCase())
    );
    setData(filtered);
  }


  const handleregisterforshift = async(id) => {
    let response = await fetch(`${rooturl}/shifts/registershift/${id}`, {
      method: "POST",
      credentials: 'include',
      headers:{
          'x-access-token': localStorage.getItem('token'),
          }
        })

    console.log(response);
    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      // setData(data.filter(job => job.id !== id));
      setColor('bg-green-100 border border-green-400 text-green-700');
      setMessage("Registered for shift");
    }
    else if (response.status === 400 || response.status === 401 || response.status === 404) {
      setColor('bg-red-100 border border-red-400 text-red-700');
      setMessage(data.error);
    }
    else {
      console.log("error");
      setColor('bg-red-100 border border-red-400 text-red-700');
      setMessage(`Couldn't Register for shift ${id} error`);
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
            
            // console.log(response);
            let data = await response.json();
            data = data.shifts
            console.log(data);
            console.log("server se mila hua data upar hai")
            

            if (response.status === 200 && data.length > 0) {
              console.log("Data set krdiya")
              
              setData(data);
            }

            else if (response.status === 200 && data.length === 0) {
              console.log("Server se kuch nhi mila")
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
    <div
    className='text-center text-2xl font-bold text-green-600 my-2'
    >Availale shifts</div>
    {/* <div class="block w-40 h-25 p-6 bg-white border border-gray-200 rounded-lg shadow-md  dark:bg-gray-800 ">
    </div> */}

    <div className="flex flex-row align-left my-2">
        <input 
        type="text"
        placeholder="Search"
        // value={search}
        // value = ''
        onChange={handlesearch}
        className="border border-blue-400 text-black-600  p-2"
        />
        <button
        className="bg-blue-600 text-white ml-5 p-2 rounded hover:bg-blue-700"
        onClick={fetchfromdb}
        >Refresh</button>

    </div>

    <table class="table-auto my-4">
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

                {/* <th
                className="border border-blue-400  w-1/12 p-2"
                >Max Volunteers</th> */}

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
                >Register for shift</th>     
          </tr>
      </thead>
      <tbody>
        { data.length > 0 ? (
          
          data.map((shifts) => {
              const index = data.indexOf(shifts)+1;
              return (
                <tr 
                className='align-center text-center ' id = {shifts.id}
                >
                  <td className="border border-blue-400  w-1/12 p-2 ">{index}</td>
                  <td className="border border-blue-400  w-1/12 p-2">{shifts.start_time}</td>
                  <td className="border border-blue-400  w-1/12 p-2">{shifts.end_time}</td>
                  {/* <td className="border border-blue-400  w-1/12 p-2">{shifts.max_volunteers}</td> */}
                  <td className="border border-blue-400  w-1/12 p-2">{shifts.work_type}</td>
                  <td className="border border-blue-400  w-1/12 p-2">{shifts.location}</td>
                  <td className="border border-blue-400  w-3/12 p-2">{shifts.description}</td>
                  <td className="border border-blue-400  w-1/12 p-2">
                    <button onClick={() => handleregisterforshift(shifts.id)}
                    className="bg-green-500 hover:bg-white hover:text-green-500 hover:border hover:border-green-500 text-white font-bold py-2 px-4 rounded"
                    >
                      {/* <svg xmlns="http://www.w3.org/2000/svg"  fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg> */}
                      Register
                    </button>
                  </td>                    
                </tr>
              )
          })
      ) : (
        <tr>
          <td colSpan={6}>No shift Available!</td>
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