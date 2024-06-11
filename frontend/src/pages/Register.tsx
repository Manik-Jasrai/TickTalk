
import { Link } from "react-router-dom"
const Register = () => {
  return (
    <div className = "flex flex-col space-y-2 justify">
      
      <div>
        <label >Username </label>
        <input type="text" placeholder="Username"></input>
      </div>  
      <div>
        <label>Password </label>
        <input type="password" placeholder="Password"></input>
      </div>
      <button className="w-36 mx-auto">Register</button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  )
}

export default Register