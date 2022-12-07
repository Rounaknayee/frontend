import React from 'react'
import { rooturl } from '../config';
import { useState } from 'react';

function Fileupload() {
    const [message, setMessage] = useState("");
// const [file, setFile] = React.useState(null);
let fileupload = async(files)=>{
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file)
    console.log(formData);
    let res = await fetch(rooturl + "admin/upload", {
        method: "POST",
        credentials: 'include',
        body: formData,
        headers:{
            'x-access-token': localStorage.getItem('token'),
        }
    })
    console.log(res);
    if (res.status === 200) {
        let resJson = await res.json();
        setMessage("File Uploaded Successfully");
        console.log(resJson);
    }
    else {
        setMessage("File Upload Failed");
        console.log("error");
    }



    // const config = {
    //     headers: {
    //         "Contetnt-Type":"multipart/form-data" 
    //     }
    // };
    }
  return (

  

    <div>

        {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
        
        <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-1/2 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Upload your CSV File</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={(e) => fileupload(e.target.files)}/>
                <div class="message">{message ? <p color='red'>{message}</p> : null}</div>
            </label>
        </div> 
    </div>
  )
}

export default Fileupload