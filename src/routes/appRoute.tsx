import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from '../layout/appLayout'; 
import LoginPage from "../pages/loginPage";
import SignUp from "../pages/signUp";
import LandingPage from "../pages/landingPage"; 
import OtpPage from "../pages/otpPage"
import CreateSpace from "../pages/createSpace";
import AllSpaces from "../pages/allSpaces";
import Workspace from "../pages/workspace";

function AppRoute() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<SignUp />} />
      <Route path="otp" element={<OtpPage />} />

      {/* Private Routes (Using AppLayout) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-space" element={<CreateSpace />} />
        <Route path="/allWorkspace" element={<AllSpaces />} />
        <Route path="/workspace/:id" element={<Workspace />} />
        {/* Add other routes under AppLayout */}
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoute;
