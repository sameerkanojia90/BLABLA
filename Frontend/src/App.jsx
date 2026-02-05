import React from 'react';
import './index.css';
import 'antd/dist/reset.css';

import Firstppage from './pages/Firstppage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Dashboard from '../Components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Firstppage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

