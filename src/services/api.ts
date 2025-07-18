import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://authapi.healthsafetytech.com";

const authApi = axios.create({ baseURL });

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default authApi;