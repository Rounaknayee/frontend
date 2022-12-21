import React from 'react'
import { loader, rooturl } from '../config';
import { useState } from 'react';
import { useRef } from 'react';

function Fileupload({urlname}) {

    console.log(urlname)
    
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("green");
    const [loading, setLoading] = useState();
    const fileuploadinput = useRef();

    let fileupload = async(e)=>{
        // fileuploadinput.current.disabled = true;
        setLoading(true);
        setMessage(null)
        console.log(e.target.files);
        let files = e.target.files;
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file)
        console.log(formData);

        fileuploadinput.current.value = null;

        let res = await fetch(rooturl + urlname, {
            method: "POST",
            credentials: 'include',
            body: formData,
            headers:{
                'x-access-token': localStorage.getItem('token'),
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            setColor("red");
            // fileuploadinput.current.disabled = false;
            setMessage("File Upload Server Error");
            return
        });
        console.log(res);
        try{
            let data  = await res.json();
            if (res.status === 200) {
                
                setLoading(false);
                setColor("green");
                // fileuploadinput.current.disabled = false;
                setMessage(data.message);
                console.log(data.message);
            }
            else if (res.status === 400) {
                setLoading(false);
                setColor("red");
                // fileuploadinput.current.disabled = false;
                setMessage(data.error);
                console.log(data.error);
                return
            }
            else if (res.status === 422) {
                setLoading(false);
                setColor("red");
                // fileuploadinput.current.disabled = false;
                setMessage(data.error);
                console.log(data.error);
                return
            }
            else{
                setLoading(false);
                setColor("red");
                // fileuploadinput.current.disabled = false;
                setMessage("Failed Error code XXX");
                console.log("error");
                return
            }
        }
        catch(err){
            console.log(err);
            setLoading(false);
            setColor("red");
            // fileuploadinput.current.disabled = false;
            setMessage("File Upload Failed");
            return
        }
        finally{
            setLoading(false);
        }
        
    }
  return (
    <div>
        <div
        className='text-center text-2xl font-bold text-green-600 mb-5'
        >Upload Files Here!</div>
        
        <div class="flex w-128 mb-8">
            <label for="dropzone-file" class="flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-300 ">
                <div class="flex flex-col items-center justify-center px-12 py-6">
                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Upload your CSV File</p>
                </div>
                <input id="dropzone-file" ref={fileuploadinput} type="file" accept=".csv" class="hidden" onChange={(e) => fileupload(e)} 
                
                />       
            </label>
        </div> 
        {loading ?
        <div className="flex justify-center">
            {loader}
        </div>
        : null}
        {message ? 
        <div className={`bg-${color}-100 border border-${color}-400 text-${color}-700  px-4 py-3 rounded relative`}>
        <p class="font-bold">{message}</p>
        </div>
        : null}  
    </div>
  )
}

export default Fileupload