import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrMsg("Please enter all the fields");
      return;
    }
    try {
      await axios.post(
        "/register",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setErrMsg("");

      // Redirect to Login Page
      navigate("/login");
    } catch (err: any) {
      if (err?.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col w-full max-w-md p-8 space-y-4 bg-zinc-800 rounded shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-gray-400">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 rounded"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
