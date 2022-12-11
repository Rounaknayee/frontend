import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import NotFound from './components/NotFound';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Testlogin from './components/Testlogin';
import Forgotpassword from './components/Forgotpassword.jsx';
import CoordinatorDashboard from './components/CoordinatorDashboard';


function App() {

  return (
    <div>
      
      <Router>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/forgotpassword' element={<Forgotpassword/>} />
            <Route path='/userdashboard' element={<UserDashboard/>} />
            <Route path='/admindashboard' element={<AdminDashboard/>} />
            <Route path='/coordinatordashboard' element={<CoordinatorDashboard/>} />
            <Route path="*" element={<NotFound/>}/>
            <Route path="/testlogin" element={<Testlogin/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
