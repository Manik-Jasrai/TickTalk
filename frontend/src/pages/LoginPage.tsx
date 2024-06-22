import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../api/axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/userState";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username , setUsername] = useState<string>('');
  const [password , setPassword] = useState<string>('');
  const setUser = useSetRecoilState(userState);

  const [errMsg,setErrMsg] = useState<string>('');

  useEffect(() => {
    setErrMsg('');
  },[username,password]);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    if(username == '' || password == '') {
      setErrMsg('Please enter all the fields');
      return;
    }
    try {
      const response = await axios.post('/login',
        { username, password},
        {
          headers : { 'Content-Type': 'application/json' }
        }
      )
      setErrMsg('');
      const token = response?.data?.accessToken;
      setUser({
        username,
        token
      });
      
      navigate('/');

    } catch (err : any) {
      console.log(err);
      
      if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Invalid Username or Password');
      } else {
          setErrMsg('Login Failed');
      }
    }
  };

  return (
    <div className = "flex flex-col space-y-2 justify m-auto">
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label >Username </label>
          <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}></input>
        </div>  
        <div>
          <label>Password </label>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}></input>
        </div>
        <button className="w-36 mx-auto" type='submit'>Log In</button>
      </form>
      <p className="text-red-600 text-sm">{errMsg}</p>
      <p>Don't have an account?<Link to="/register"> Register Here</Link></p>
    </div>
  )
}

export default LoginPage