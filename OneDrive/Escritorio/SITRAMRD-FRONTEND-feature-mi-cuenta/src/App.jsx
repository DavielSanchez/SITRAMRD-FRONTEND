import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
