import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import RegisterAuth from './pages/RegisterAuth';
import ResetPassword from './pages/ResetPassword';
import SendOtp from './pages/SendOtp';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import Unauthorized from './pages/unauthorized';
import PanelOperador from './pages/PanelOperador';
import Incidencias from './pages/Incidencias';
import VistaAsignar from './pages/VistaAsignar';

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
          <Route path='/settings' element={<Settings/>}/>
          <Route path="/operador" element={<PanelOperador />} />
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/asignar" element={<VistaAsignar />} />
      
          <Route 
          path="/" 
          element={
          <ProtectedRoute allowedRoles={['Pasajero', 'Operador', 'Administrador']}>
            <Home />
          </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
