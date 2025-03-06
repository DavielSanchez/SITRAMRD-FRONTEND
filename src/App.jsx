import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Aquí debes pasar <Auth /> como elemento */}
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


