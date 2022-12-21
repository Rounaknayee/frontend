import React from 'react'
import { useState,useEffect } from 'react'
import { rooturl} from "../config";


function Coordinatorshifts() {

  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [color, setColor] = useState('red');

  const handlesearch = (e) => {
    setSearch(e.target.value);
  }
  const handleregisterforshift = async(id) => {
  }

  const fetchfromdb = async() => {
            let response = await fetch(`${rooturl}/coordinator/getshifts`, {
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
              setColor('green');              
              setData(data);
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
    <div
    className='text-center text-2xl font-bold text-green-600 my-2'
    >Your Company's shifts</div>

    <div className="flex flex-row align-left my-2">
        <input 
        type="text"
        placeholder="Search"
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
          
          data.filter(
            shifts => 
              shifts.start_time.toString().includes(search.toLowerCase()) || shifts.end_time.toString().includes(search.toLowerCase()) || shifts.work_type.toLowerCase().includes(search.toLowerCase()) || shifts.location.toLowerCase().includes(search.toLowerCase()) || shifts.description.toLowerCase().includes(search.toLowerCase())
            
          ).map((shifts) => {
              const index = data.indexOf(shifts)+1;
              return (
                <tr 
                className='align-center text-center ' id = {shifts.id}
                >
                  <td className="border border-blue-400  w-1/12 p-2 ">{index}</td>
                  <td className="border border-blue-400  w-1/12 p-2">{shifts.start_time}</td>
                  <td className="border border-blue-400  w-1/12 p-2">{shifts.end_time}</td>
                  <td className="border border-blue-400  w-1/12 p-2">{shifts.work_type}</td>
                  <td className="border border-blue-400  w-1/12 p-2">{shifts.location}</td>
                  <td className="border border-blue-400  w-3/12 p-2">{shifts.description}</td>
                  <td className="border border-blue-400  w-1/12 p-2">
                    <button onClick={() => handleregisterforshift(shifts.id)}
                    className="bg-green-500 hover:bg-white hover:text-green-500 hover:border hover:border-green-500 text-white font-bold py-2 px-4 rounded"
                    >
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

export default Coordinatorshifts