import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
