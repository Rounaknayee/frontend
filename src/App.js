import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import NotFound from './components/NotFound';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';


function App() {

  return (
    <div class="h-full">
      
      <Router>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/userdashboard' element={<UserDashboard/>} />
            

            <Route path='/admindashboard' element={<AdminDashboard/>} />


            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
