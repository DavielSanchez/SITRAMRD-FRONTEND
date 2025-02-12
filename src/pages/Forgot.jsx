import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
    
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("A reset link has been sent to your email.");
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white overflow-hidden">
      <div className="w-full max-w-lg px-6 py-12 bg-[#eff3fe] rounded-[20px] flex flex-col justify-center items-center gap-6">
        <h2 className="text-center text-[#211f47] text-3xl sm:text-4xl font-semibold">Forgot your password</h2>
        <p className="text-center text-black text-lg sm:text-xl font-semibold">Please enter your email address</p>
        <div className="w-full relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address..."
            className="w-full h-12 sm:h-[77px] bg-white rounded-[10px] border-2 border-[#6a62dc] px-4 text-lg sm:text-2xl font-semibold text-[#38357a] focus:outline-none"
          />
        </div>
        <button
          onClick={handleResetPassword}
          className="w-full h-12 sm:h-[60.40px] bg-[#6a62dc] rounded-[10px] text-white text-lg sm:text-2xl font-semibold"
        >
          Reset Password
        </button>
        {message && <p className="text-center text-[#38357a] text-lg sm:text-xl font-semibold">{message}</p>}
      </div>
    </div>
  );
}
