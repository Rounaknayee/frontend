import React from 'react'

function Navbar() {
  return (
    <div>
        <nav
        class="flex items-center bg-white shadow border-solid py-4 border-t-2 border-blue-700">
        <div class="w-3/4">
        <img src = "./techimpact_logo.png " alt = "logo" className="align-left ml-5  w-40 object-contain bg-gray-200 "/>
        </div>
        <div class="align-left ">

            <div class="f">
                <button onClick={() => {localStorage.clear(); window.location.href = "/login";}}
                   class="block align-left px-4 py-2 rounded border text-blue-700 font-bold hover:text-white hover:bg-blue-700 ">logout</button>
            </div>
        </div>    
        </nav>
    </div>
  )
}

export default Navbar