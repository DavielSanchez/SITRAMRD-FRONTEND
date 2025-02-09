import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Aquí debes pasar <Auth /> como elemento */}
          <Route path="/" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
