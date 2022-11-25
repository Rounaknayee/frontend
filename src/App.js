
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import NotFound from './components/NotFound';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            {/* <Route path='/dashboarduser' element={<Dashboarduser/>} /> */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
