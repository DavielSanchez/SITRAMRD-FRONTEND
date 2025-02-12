import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Reset from './pages/Reset';
import Forgot from './pages/Forgot';  

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<Auth />} />
          <Route path="/forgot" element={<Forgot />} /> 
          <Route path="/Reset" element={<Reset />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
