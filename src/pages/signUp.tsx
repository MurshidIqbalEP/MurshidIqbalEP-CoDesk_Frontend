
import {Input} from "@nextui-org/react";
import Logo from "../assets/CoDesk2-removebg-preview.png"
import { useState } from "react";
import Office from "../assets/office.jpg"
import { Link,useNavigate } from 'react-router-dom';
import { sign_up } from "../api/auth";
import { toast } from "sonner";

function signUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [err, SetErr] = useState({ name:"",email: "", password: "", repassword:"" });

  const navigate = useNavigate()

  const submitRegister = async()=>{


    let validationErrors = {
      name: "",
      email: "",
      password: "",
      repassword: "",
    };
    let valid = true;

    if (name.trim() === "") {
      validationErrors.name = "Name is required.";
      valid = false;
    }

    if (email.trim() === "") {
      validationErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid.";
      valid = false;
    }

    if (password.trim() === "") {
      validationErrors.password = "Password is required.";
      valid = false;
    }else if(password.length > 6 ) {
      validationErrors.password = "6 digit Password is required.";
      valid = false;
    }

    if (rePassword.trim() === "") {
      validationErrors.repassword = "Confirm Password is required.";
      valid = false;
    }

    if (password !== rePassword) {
      validationErrors.repassword = "Passwords do not match.";
      valid = false;
    }

    SetErr(validationErrors);
   

    if (valid) {
      try {
        const response = await sign_up(name, email, password);

        if (response) {
          toast.success(response.data.message);
          
          navigate("/otp",{ state: { email: response.data.user.email} });
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  } 

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-400 ">
      {/* Centered div */}
      <div className="flex w-[900px] max-w-screen-sm h-auto ">
        <div className="w-1/2 bg-white p-4 rounded-tl-lg flex flex-col rounded-bl-lg items-center shadow-2xl">
          <img className="p-5 pb-0" src={Logo} alt="logo" />

          <p className="font-mono font-light text-slate-500 text-xs">
            Please enter your details
          </p>

          <div className="flex flex-col w-full justify-center mt-1 items-center md:flex-nowrap mb-0 md:mb-0 gap-1">

          <Input
              key="name"
              type="text"
              label="Name"
              labelPlacement="outside"
              className="w-[250px]"
              size="sm"
              variant="bordered"
              onChange={(e) => setName(e.target.value)}
            />
            {err.name && (
              <p className="text-xs font-mono font-light text-red-500 text-left w-[250px]">
                {err.name}
              </p>
            )}

            <Input
              key="email"
              type="email"
              label="Email"
              labelPlacement="outside"
              className="w-[250px]"
              size="sm"
              variant="bordered"
              onChange={(e) => setEmail(e.target.value)}
            />
            {err.email && (
              <p className="text-xs font-mono font-light text-red-500 text-left w-[250px]">
                {err.email}
              </p>
            )}

            <Input
              key="password"
              type="password"
              label="Password"
              labelPlacement="outside"
              className="w-[250px]"
              size="sm"
              variant="bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
            {err.password && (
              <p className="text-xs font-mono font-light text-red-500 text-left w-[250px]">
                {err.password}
              </p>
            )}

            <Input
              key="repassword"
              type="password"
              label="conform password"
              labelPlacement="outside"
              className="w-[250px]"
              size="sm"
              variant="bordered"
              onChange={(e) => setRePassword(e.target.value)}
            />
            {err.repassword && (
              <p className="text-xs font-mono font-light text-red-500 text-left w-[250px]">
                {err.repassword}
              </p>
            )}
          </div>

          <button
            className="bg-purple-900 w-[250px] mt-4 rounded-lg font-poppins text-sm text-white h-8"
            onClick={submitRegister}
            type="button"
          >
            Sign in
          </button>

          {/* <button
            className="bg-white w-[250px] mt-2 rounded-lg font-poppins text-sm text-black h-8 border border-black flex items-center justify-center gap-2"
            onClick={() => Glogin()}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button> */}


          <p className="text-xs mt-2 text-gray-400">
            You have an account?
            <Link to="/login">
              <span className="text-purple-900 hover:text-gray-400">
                Login!
              </span>
            </Link>
          </p>
        </div>

        <div className="w-1/2">
          <img
            className="h-full rounded-tr-lg rounded-br-lg"
            src={Office}
            alt="background"
          />
        </div>
      </div>
    </div>
  )
}

export default signUp
