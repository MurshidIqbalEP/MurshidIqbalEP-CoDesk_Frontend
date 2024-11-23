import { useState } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import OTPVerificationForm from "./otpForm";

const Modal: React.FC<{ showModal: boolean; onClose: () => void }> = ({
  showModal,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState<"login" | "register" | "otp">(
    "login"
  );
  const [email,setEmail] = useState("")

  const  handleSetEmail = (email:string) => {
    setEmail(email)
  }

  // Close the modal
  const closeModal = () => {
    onClose();
    setCurrentPage("login"); 
  };

  // Page Toggling Functions
  const showRegister = () => setCurrentPage("register");
  const showLogin = () => setCurrentPage("login");
  const showOTPVerification = () => setCurrentPage("otp");

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 w-96 p-6 rounded-lg shadow-lg">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-white font-semibold">
                {currentPage === "login"
                  ? "Login"
                  : currentPage === "register"
                  ? "Register"
                  : "OTP Verification"}
              </h3>
              
            </div>

            {/* Conditional Rendering of Forms */}
            {currentPage === "login" && (
              <LoginForm
                close={closeModal}
              />
            )}
            {currentPage === "register" && <RegisterForm navigate={showOTPVerification} setdata={handleSetEmail} />}
            {currentPage === "otp" && (
              <OTPVerificationForm navigate={showLogin} email={email} />
            )}

            {/* Footer with toggle link */}
            <div className="text-center mt-4">
              {currentPage === "login" && (
                <button
                  onClick={showRegister}
                  className="text-blue-600 underline cursor-pointer"
                >
                  Don't have an account? Register
                </button>
              )}
              {currentPage === "register" && (
                <button
                  onClick={showLogin}
                  className="text-blue-600 underline cursor-pointer"
                >
                  Already have an account? Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
