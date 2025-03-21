import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import RegisterAuth from './pages/RegisterAuth';
import ResetPassword from './pages/ResetPassword';
import SendOtp from './pages/SendOtp';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import Unauthorized from './pages/unauthorized';
import Pay from './pages/Pay';
import Chat from './pages/Chat';
import AdminDashboard from "./pages/AdminDashboard";
import GestionOperadores from "./pages/GestionOperadores";
import Auditoria from './pages/Auditoria';
import HomeView from './pages/HomeView';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_SECRET_LINK}`);
function App() {
  return (
    <>
      <Router>
      <Elements stripe={stripePromise}>
        <ToastContainer />
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Auth />} />
          <Route path='/register' element={<RegisterAuth/>}/>
          <Route path='/forgot' element={<ForgotPassword/>}/>
          <Route path='/send-otp' element={<SendOtp/>}/>
          <Route path='/reset' element={<ResetPassword/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/pay' element={<Pay/>}/>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/gestion" element={<GestionOperadores />} />
          <Route path="/auditoria" element={<Auditoria />} />
          <Route path='/HomeView' element={<HomeView/>}/>
          <Route 
            path="/" 
            element={
              <ProtectedRoute allowedRoles={['Pasajero', 'Operador', 'Administrador']}>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
        </Elements>
      </Router>
    </>
  );
}

export default App;
