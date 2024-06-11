import './App.css'
import ChatPage from './pages/ChatPage'
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom' 
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'

function App() {
  
  return (
    <Router >
      <Routes>
        <Route path='/' Component={ChatPage} />
        <Route path = '/login' Component={LoginPage} />
        <Route path='/register' Component={Register} />
        
      </Routes>
    </Router>
  )
}

export default App
