import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "../api/axios";

const Register = () => {
  const [username , setUsername] = useState<string>('');
  const [password , setPassword] = useState<string>('');
  const navigate = useNavigate();
  const [errMsg , setErrMsg] = useState<string>('');

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    if(username == '' || password == '') {
      setErrMsg('Please enter all the fields');
      return;
    }
    try {
      await axios.post('/register',
        JSON.stringify({ username, password }),
        {
          headers : { 'Content-Type': 'application/json' }
        }
      );
      setErrMsg('');

      // Redirect to Login Page
      navigate('/login');
    } catch (err : any) {
      if (err?.response?.status === 409) {
          setErrMsg('Username Taken');
      } else {
          setErrMsg('Registration Failed')
      }
    }
  }
  return (
    <div className = "flex flex-col space-y-2 justify m-auto">
      <form onSubmit={e=>handleSubmit(e)}>
        <div>
          <label >Username </label>
          <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}></input>
        </div>  
        <div>
          <label>Password </label>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}></input>
        </div>
        <button className="w-36 mx-auto" type="submit">Register</button>
      </form>
      <p className="text-red-600 text-sm">{errMsg}</p>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  )
}

export default Register