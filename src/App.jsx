import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import RegisterAuth from './pages/RegisterAuth';
import ResetPassword from './pages/ResetPassword';
import SendOtp from './pages/SendOtp';
import ForgotPassword from './pages/ForgotPassword';
<<<<<<< HEAD
import Settings from './pages/Settings';
=======
import Unauthorized from './pages/unauthorized';
>>>>>>> 9eeb96811d5ccc93398f1aa474d31ada52cc3d86

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Auth />} />
          <Route path='/register' element={<RegisterAuth/>}/>
          <Route path='/forgot' element={<ForgotPassword/>}/>
          <Route path='/send-otp' element={<SendOtp/>}/>
          <Route path='/reset' element={<ResetPassword/>}/>
<<<<<<< HEAD
          <Route path='/settings' element={<Settings/>}/>
=======
          <Route 
          path="/" 
          element={
          <ProtectedRoute allowedRoles={['Pasajero', 'Operador', 'Administrador']}>
            <Home />
          </ProtectedRoute>
          } />
>>>>>>> 9eeb96811d5ccc93398f1aa474d31ada52cc3d86
        </Routes>
      </Router>
    </>
  );
}

export default App;
