import React from 'react'
import { useState, useEffect } from 'react';
import { rooturl } from '../config'

function Modal({ show, onClose, onRegister }) {
  return (
      <div id="defaultModal" style={{ display: show ? 'block' : 'none' }}
        data-modal-show="true"
        tabIndex="-1" aria-hidden="true" class="fixed top-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <div class="relative bg-white rounded-lg shadow ">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900">
                            Disclaimer
                        </h3>
                        <button 
                        onClick={onClose}
                        type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-6 space-y-6">
                        <p class="text-base leading-relaxed text-gray-500 justify">
                        As a volunteer, you are not an employee of the organization and are not entitled to the same protections and benefits as employees. You are volunteering your time and services to the organization on a voluntary basis and are not entitled to compensation for your time or services. You are also not covered by the organization's insurance policies, and you are responsible for your own personal safety and well-being while volunteering. By volunteering, you agree to indemnify and hold the organization and its employees, officers, and directors harmless from any and all claims, damages, or expenses that may arise from your volunteer activities. Please be aware of any potential risks associated with your volunteer activities and take appropriate precautions to protect your own safety and well-being.
                        </p>
                    </div>
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button 
                        onClick={onRegister}
                        data-modal-toggle="defaultModal" type="button" class="text-bold text-white border bg-green-500 hover:bg-white hover:text-green-500 hover:border hover:border-green-500 text-sm font-medium px-5 py-2.5  focus:z-10 rounded-lg">Accept & Register</button>
                        <button 
                        onClick={onClose}
                        data-modal-toggle="defaultModal" type="button" class="text-bold text-white border bg-red-500 hover:bg-white hover:text-red-500 hover:border hover:border-red-500 text-sm font-medium px-5 py-2.5  focus:z-10 rounded-lg ">Decline</button>
                    </div>
                </div>
            </div>
        </div> 
  );
}

export default function UserShifts() {

  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [color, setColor] = useState('red');
  const [ShowModal, setShowModal] = useState(false);
  const [modalshifts, setModalShifts] = useState('');

  const handlesearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  const handlemodal = (e) => {
    setModalShifts(e);
    setShowModal(true);
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
    let res = await response.json();
    console.log(data);

    if (response.status === 200) {
      setData(data.filter(job => job.id !== id));
      setColor('green');
      setMessage("Registered for shift");
      setShowModal(false);
    }
    else if (response.status === 400 || response.status === 401 || response.status === 404) {
      setColor('red');
      setMessage(res.error);
      setShowModal(false);
    }
    else {
      console.log("error");
      setColor('red');
      setMessage(`Couldn't Register for shift ${id} error`);
      setShowModal(false);
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
    >Available shifts</div>

    <div className="flex flex-row align-left my-2">
        <input 
        type="text"
        placeholder="Search Here ..."
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
            data => 
            data.start_time.toString().includes(search.toLocaleLowerCase()) ||
            data.end_time.toString().includes(search.toLocaleLowerCase()) ||
            data.work_type.toLowerCase().includes(search.toLocaleLowerCase()) ||
            data.location.toLowerCase().includes(search.toLocaleLowerCase()) ||
            data.description.toLowerCase().includes(search.toLocaleLowerCase())
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
                    <button 
                    type="button" data-modal-toggle="defaultModal" 
                    onClick = {()=>(handlemodal(shifts.id))}                
                    className="bg-green-500 border hover:bg-white hover:text-green-500 hover:border hover:border-green-500 text-white font-bold py-2 px-4 rounded"
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

    <Modal show={ShowModal} onClose={() => setShowModal(false)} onRegister={()=>(handleregisterforshift(modalshifts))} />
  
    {message ? 
    <div className={`bg-${color}-100 border border-${color}-400 text-${color}-700  px-4 py-3 rounded relative`}>
    <p class="font-bold">{message}</p>
    </div>
     : null}
  </div>
  )
}