import React from 'react';
import {
    Link
  } from "react-router-dom";
  
function Home() {
    return(
        <div>
            <h1>This Is Home</h1>
            <h2>To Login Click <Link to='/login'>Here</Link></h2>
            <h2>New User? Click <Link to='/register'>Here</Link> to register</h2>
        </div>
    )
}
export default Home;