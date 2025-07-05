import { Route,Routes, BrowserRouter as Router } from 'react-router-dom' 
import { RecoilRoot, useRecoilValue } from 'recoil'
import './App.css'
import ChatPage from './pages/ChatPage' 
import AvatarPage from './pages/AvatarPage' 
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import RequireAuth from './components/RequireAuth'
import RecoilNexus from 'recoil-nexus'
import { useInitAuth } from './hooks/useInitAuth'
import { authLoadedAtom } from './atoms/userState'


function AppRoutes() {
  useInitAuth(); // ✅ Safe now (within RecoilRoot)
  const authLoaded = useRecoilValue(authLoadedAtom);

  if (!authLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path='/' element={<ChatPage />} />
          <Route path='/avatar' element={<AvatarPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <AppRoutes /> 
    </RecoilRoot>
  );
}

export default App
