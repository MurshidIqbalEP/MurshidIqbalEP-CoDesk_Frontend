import { useState } from "react";
import { sign_up } from "../api/auth";
import { toast } from "sonner";

interface RegisterFormProps {
  navigate: () => void;
  setdata: (email: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ navigate, setdata }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, SetErr] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });

  const handleSubmit = async () => {
    let validationErrors = {
      name: "",
      email: "",
      pass: "",
      confirmPass: "",
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

    if (pass.trim() === "") {
      validationErrors.pass = "Password is required.";
      valid = false;
    } else if (pass.length !== 6) {
      validationErrors.pass = "Password must be exactly 6 characters.";
      valid = false;
    }

    if (confirmPass.trim() === "") {
      validationErrors.confirmPass = "Confirm Password is required.";
      valid = false;
    } else if (pass !== confirmPass) {
      validationErrors.confirmPass = "Passwords do not match.";
      valid = false;
    }

    SetErr(validationErrors);

    if (valid) {
      try {
        const response = await sign_up(name, email, pass);
        if (response) {
          setdata(email);
          toast.success(response.data.message);
          navigate();
        }
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Failed to register. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm">Name</label>
        <input
          id="register-name"
          value={name}
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-gray-900 border rounded"
        />
        {err.name && <p className="text-xs text-red-500">{err.name}</p>}
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-900 border rounded"
        />
        {err.email && <p className="text-xs text-red-500">{err.email}</p>}
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input
          id="register-password"
          type="password"
          value={pass}
          placeholder="Enter your password"
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-2 bg-gray-900 border rounded"
        />
        {err.pass && <p className="text-xs text-red-500">{err.pass}</p>}
      </div>
      <div>
        <label className="block text-sm">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPass}
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPass(e.target.value)}
          className="w-full p-2 bg-gray-900 border rounded"
        />
        {err.confirmPass && <p className="text-xs text-red-500">{err.confirmPass}</p>}
      </div>
      <button
        className="w-full bg-purple-900 text-white p-2 rounded"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
