import React from 'react'

import { useState } from 'react'
import { useEffect } from 'react'
import { rooturl} from "../config";


function Cooordinatorusers() {

    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');
    const [color, setColor] = useState('red');
    var qdata = '';
    const handlesearch = (e) => {
    }
    
    const handledeleteuser = async(id) => {
      let response = await fetch(`${rooturl}/coordinator/deleteuser/${id}`, {
        method: "POST",
        credentials: 'include',
        headers:{
            'x-access-token': localStorage.getItem('token'),
            }
        })
  
      console.log(response);
      let res = await response.json();
      console.log(res);
  
      if (response.status === 200) {
        setData(data.filter(user => user.id !== id));
        setColor('bg-green-100 border border-green-400 text-green-700');
        setMessage("Deleted User");
      }
      else if (response.status === 400 || response.status === 401 || response.status === 404) {
        setColor('bg-red-100 border border-red-400 text-red-700');
        setMessage(res.error);
      }
      else {
        console.log("error");
        setColor('bg-red-100 border border-red-400 text-red-700');
        setMessage(`Couldn't Delete user ${id} error`);
      }
    }
  
    const fetchfromdb = async() => {
              let response = await fetch(`${rooturl}/coordinator/getusers`, {
                method: "GET",
                credentials: 'include',
                      headers:{
                          'x-access-token': localStorage.getItem('token'),
                          }
                })
              
              // console.log(response);
              let data = await response.json();
              data=data.users
              console.log(data);
              console.log("server se mila hua data upar hai")
              
  
              if (response.status === 200 && data.length > 0) {
                console.log("Data set krdiya")
                
                setData(data);
              }
  
              else if (response.status === 200 && data.length === 0) {
                console.log("Server se kuch nhi mila")
                setData([]);
                setMessage("No users found");
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
      >Our Users</div>
  
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
  
      <table class="table-fixed my-4">
        <thead>
        <tr>
                  <th
                  className="border border-blue-400  w-1/12 p-2"
                  >ID</th>
  
                  <th
                  className="border border-blue-400  w-2/12 p-2"
                  >Name</th>
  
                  <th
                  className="border border-blue-400  w-3/12 p-2"
                  >Email</th>

                  <th
                  className="border border-blue-400  w-2/12 p-2"
                  >phone</th>
  
                  <th
                  className="border border-blue-400  w-2/12 p-2"
                  >city</th>  

                  <th
                    className="border border-blue-400  w-2/12 p-2"
                    >Delete</th>

            </tr>
        </thead>
        <tbody>
          { data.length > 0 ? (
            
            data.map((users) => {
                const {id,name, email, city, phone} = users;
                const index = data.indexOf(users)+1;
                return (
                  <tr 
                  className='align-center text-center '
                  >
                <td className="border border-blue-400  w-1/12 p-2 ">{index}</td>
                <td className="border border-blue-400  w-2/12 p-2">{name}</td>
                <td className="border border-blue-400  w-3/12 p-2">{email}</td>
                <td className="border border-blue-400  w-2/12 p-2">{phone}</td>
                <td className="border border-blue-400  w-2/12 p-2">{city}</td>
                <td className="border border-blue-400  w-2/12 p-2">
                    <button onClick={() => handledeleteuser(id)}
                    className="bg-red-500 hover:bg-white hover:text-red-500 hover:border hover:border-red-500 text-white font-bold py-2 px-4 rounded"
                    >
                    Delete User
                    </button>
                </td>                    
                  </tr>
                )
            })
        ) : (
          <tr>
            <td colSpan={6}>No users in our company!</td>
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

export default Cooordinatorusers