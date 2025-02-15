import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import RegisterAuth from './pages/RegisterAuth';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Aquí debes pasar <Auth /> como elemento */}
          <Route path="/" element={<Auth />} />
          <Route path='/Register' element={<RegisterAuth/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
