import axios from "axios";
import { RootState } from '../redux/store'; // Adjust based on your project structure
import store from '../redux/store';
import { updateAccessToken,logOut } from "../redux/userSlice";


const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const Api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

Api.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const token = state.user.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(token)
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);



Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for unauthorized errors (401)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite retry loop
      console.log(error.response.status);
      try {
        // Refresh the access token
        

        const res = await Api.get("/auth/refresh-token");
        let newAccessToken = res.data.accessToken;
        console.log("neeeeeeeeeeeeeeeew " + newAccessToken);
        store.dispatch(updateAccessToken(newAccessToken));

        originalRequest.headers.Authorization = `Bearer${newAccessToken}`;

        
        // Retry the original request with the new access token
        return Api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        store.dispatch(logOut());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    
    return Promise.reject(error);
  }
);

export default Api;
