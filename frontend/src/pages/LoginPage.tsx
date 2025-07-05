import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/userState";
import { getRecoil } from "recoil-nexus";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(userState);

  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrMsg("Please enter all the fields");
      return;
    }
    try {
      const response = await axios.post(
        "/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setErrMsg("");
      const token = response?.data?.accessToken;
      const validUser = response?.data?.validUser;
      setUser({
        username,
        token,
        profile: validUser?.profile,
      });
      console.log("1:",getRecoil(userState))

      navigate("/");
    } catch (err: any) {
      console.log(err);

      if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid Username or Password");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col w-full max-w-md p-8 space-y-4 bg-zinc-800 rounded shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white">Log In</h1>
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
            Log In
          </button>
        </form>
        {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
