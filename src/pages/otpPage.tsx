import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { submitOtp,resentOtp } from "../api/auth";

const EnterOtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(30); 
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  useEffect(() => {
    if (isCooldownActive) {
      const timer = setInterval(() => {
        setCooldown((prevCooldown) => {
          if (prevCooldown <= 1) {
            clearInterval(timer);
            setIsCooldownActive(false); 
            return 0;
          }
          return prevCooldown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCooldownActive]);

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      let res = await submitOtp(email, otp);
      if (res?.data.message) {
        toast.success(res?.data.message);
        navigate("login");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  // Function to handle resend OTP
  const handleResendOtp = async () => {
    try {
        if (isCooldownActive) {
            toast.error("Please wait until the timer ends to resend OTP.");
            return;
          }

        let res = await resentOtp(email)
        if(res?.data.message){
            toast.success(res?.data.message)
            setIsCooldownActive(true);
            setCooldown(30);
        }

    } catch (error) {
      toast.error("An error occurred while resending OTP.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Enter OTP
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter the 6-digit OTP sent to your email.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
        />
        <button
          onClick={handleOtpSubmit}
          className="w-full bg-purple-900  hover:bg-purple-500  text-white font-bold py-2 px-4 rounded-lg mt-4"
        >
          Submit OTP
        </button>
        
        <button
        onClick={handleResendOtp}
        disabled={isCooldownActive}
        className={`px-4 py-2 rounded-lg  w-full  mt-1 ${
          isCooldownActive ? "bg-gray-300" : "bg-slate-500 hover:bg-slate-400 text-white"
        }`}
      >
        {isCooldownActive ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
      </button>
      </div>
    </div>
  );
};

export default EnterOtpPage;
