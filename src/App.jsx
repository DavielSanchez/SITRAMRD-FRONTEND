import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
