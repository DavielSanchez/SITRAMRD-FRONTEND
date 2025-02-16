import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Home from './pages/Home';
import Auth from './pages/Auth';
import RegisterAuth from './pages/RegisterAuth';
import ResetPassword from './pages/ResetPassword';
import SendOtp from './pages/SendOtp';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path='/register' element={<RegisterAuth/>}/>
          <Route path='/forgot' element={<ForgotPassword/>}/>
          <Route path='/send-otp' element={<SendOtp/>}/>
          <Route path='/reset' element={<ResetPassword/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
