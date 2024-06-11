
import { Link } from "react-router-dom"
const LoginPage = () => {
  return (
    <div className = "flex flex-col space-y-2 justify ">
      
      <div>
        <label >Username </label>
        <input type="text" placeholder="Username"></input>
      </div>  
      <div>
        <label>Password </label>
        <input type="password" placeholder="Password"></input>
      </div>
      <button className="w-36 mx-auto">Log In</button>
      <p>Don't have an account?<Link to="/register"> Register Here</Link></p>
    </div>
  )
}

export default LoginPage