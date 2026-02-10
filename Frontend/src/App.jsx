import React from 'react';
import './index.css';
import 'antd/dist/reset.css';

import Firstppage from './pages/Firstppage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Dashboard from '../Components/Dashboard';
import Forgetpassword from '../Components/Forgetpassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResetPassword from '../Components/Resetpassword';
import Publishride from '../Components/Publishride';
import Rideinfo from '../Components/Rideinfo';
import Bookings from '../Components/Bookings';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Firstppage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/forgetpassword' element={<Forgetpassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
          <Route path='/publishride' element={<Publishride/>}/>
          <Route path='/ride/:id' element={<Rideinfo />}/>
          <Route path='/bookings' element={<Bookings/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

