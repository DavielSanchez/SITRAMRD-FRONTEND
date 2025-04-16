import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './components/ProtectedRoute';
// import Home from './pages/Home';
import Auth from './pages/Auth';
import RegisterAuth from './pages/RegisterAuth';
import ResetPassword from './pages/ResetPassword';
import SendOtp from './pages/SendOtp';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import Unauthorized from './pages/unauthorized';
// import Pay from './pages/Pay';
import Chat from './pages/Chat';
import HomeView from './pages/HomeView';
import Billetera from './pages/Billetera'
import Actividad from "./pages/Actividad";

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
          <Route path='/chat' element={<Chat/>}/>
          {/* <Route path='/pay' element={<Pay/>}/> */}
          {/* <Route path='/HomeView' element={<Home />}/> */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute allowedRoles={['Pasajero', 'Operador', 'Administrador']}>
                <HomeView/> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute allowedRoles={['Pasajero', 'Operador', 'Administrador']}>
                <Settings/> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/actividad" 
            element={
              <ProtectedRoute allowedRoles={['Pasajero', 'Operador', 'Administrador']}>
                <Actividad/> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/billetera" 
            element={
              <ProtectedRoute allowedRoles={['Pasajero', 'Operador', 'Administrador']}>
                <Billetera/> 
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
