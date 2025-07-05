  // src/hooks/useInitAuth.ts
import { useEffect } from 'react';
import axios from '../api/axios';
import { authLoadedAtom, userState } from '../atoms/userState';
import { setRecoil } from 'recoil-nexus';
import { useSetRecoilState } from 'recoil';

export const useInitAuth = () => {
const setAuthLoaded = useSetRecoilState(authLoadedAtom);
  useEffect(() => {
    axios.post('/refresh', {}, { withCredentials: true })
    .then((res) => {
      setRecoil(userState, {username : res.data.user.username, token : res.data.accessToken, profile : res.data.user.profile})
      console.log('🔄 Silent login success');
    })
    .catch(() => {
      console.log('Login failed')
    }).finally(() => {
      setAuthLoaded(true);
    })
    
  }, []);
};


