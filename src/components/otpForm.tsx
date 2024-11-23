import { useState } from "react";
import { toast } from "sonner";
import { submitOtp } from "../api/auth";

interface OTPVerificationFormProps {
  navigate: () => void; 
  email:string
}

const OTPVerificationForm: React.FC<OTPVerificationFormProps> = ({ navigate,email }) => {
  const [otp, setOtp] = useState("");

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      let res = await submitOtp(email, otp);
      if (res?.data.message) {
        toast.success(res?.data.message);
        navigate()
        
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="otp" className="block text-sm">
          Enter OTP
        </label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter your OTP"
          className="w-full p-2 bg-gray-900 border rounded"
        />
      </div>

      <button
        className="w-full bg-purple-900 text-white p-2 rounded"
        onClick={handleOtpSubmit}
      >
        Verify OTP
      </button>

     
    </div>
  );
};

export default OTPVerificationForm;
