import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return(
        <div>
            <h2>Login Here</h2>

            <form>
                <label htmlFor="loginemail">Email</label>
                <input type="email" id="loginemail" placeholder="Email" required />

                <label htmlFor='loginpassword'>Password</label>
                <input type="password" id='loginpassword' placeholder="Password" required />

                <select id="usertype" >
                    <option value="Volunteer">volunteer</option>
                    <option value="admin">admin</option>
                    <option value="coordinator">coordinator</option>
                </select>

                <button type="submit">Login</button>
            </form>

            <h2>New User? Click <Link to='/register'>Here</Link> to register</h2>
        </div>
    )
}
export default Login;