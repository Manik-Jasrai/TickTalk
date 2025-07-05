import axios from "axios";
import { getRecoil, setRecoil } from "recoil-nexus";
import { userState } from "../atoms/userState";
const BASE_URL = `http://localhost:3000`

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // important if refresh token is in HttpOnly cookie
});


API.interceptors.request.use((config) => {
  const token = getRecoil(userState)?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data?.message === 'TokenExpired'
    ) {
      originalRequest._retry = true;
      try {
        const res = await API.post('/refresh');
        const newAccessToken = res.data.accessToken;
        setRecoil(userState, {...getRecoil(userState), token : newAccessToken})
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default API