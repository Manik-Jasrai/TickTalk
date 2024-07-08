import { Route,Routes, BrowserRouter as Router } from 'react-router-dom' 
import { RecoilRoot } from 'recoil'
import './App.css'
import ChatPage from './pages/ChatPage' 
import AvatarPage from './pages/AvatarPage' 
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import RequireAuth from './components/RequireAuth'

function App() {  
  return (
    <RecoilRoot >
      <Router >
        <Routes>
          <Route path = '/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} /> 
          <Route element = { <RequireAuth />}>
            <Route path= '/' element = { <ChatPage /> } />
            <Route path= '/avatar' element = { <AvatarPage /> } />
          </Route>    
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

export default App
