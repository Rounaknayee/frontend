import React, {useEffect} from 'react'
import Navbar from './Navbar'

function CoordinatorDashboard() {

    useEffect(() => {
        if(localStorage.getItem('user_type')!=='coordinator'){
            window.location.href = "/login";
            localStorage.clear();
            alert("You are not a Co-ordinator");
        }
      
    }, [])
    
  return (
    <div>
    <Navbar/>
    <div>CoordinatorDashboard</div>
    </div>
  )
}

export default CoordinatorDashboard