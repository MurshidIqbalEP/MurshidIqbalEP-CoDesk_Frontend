import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logIn } from "../redux/userSlice";
import { login } from "../api/auth";

function loginForm({ close }: { close: () => void }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, SetErr] = useState({ email: "", password: "" });

  const submitLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let validationErrors: { email: string; password: string } = {
      email: "",
      password: "",
    };
    let valid = true;

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
    } else if (password.length < 4) {
      validationErrors.password = "4 Digit Password is required.";
      valid = false;
    }

    SetErr(validationErrors);

    if (valid) {
      let res = await login(email, password);
      if (res?.data.message) {
        toast.success(res?.data.message);
        dispatch(logIn(res?.data));
        close();
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="login-email" className="block text-sm">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border bg-gray-900  rounded "
          onChange={(e) => setEmail(e.target.value)}
        />
        {err.email && (
          <p className="text-xs font-mono font-light text-red-500 text-left w-[250px]">
            {err.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 border bg-gray-900  rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        {err.password && (
          <p className="text-xs font-mono font-light text-red-500 text-left w-[250px]">
            {err.password}
          </p>
        )}
      </div>
      <button
        className="w-full bg-purple-900 text-white p-2 rounded"
        onClick={submitLogin}
      >
        Login
      </button>
    </div>
  );
}

export default loginForm;
