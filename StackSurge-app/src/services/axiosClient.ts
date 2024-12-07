import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/.netlify/functions/server";

const axiosClient = axios.create({ baseURL: API_BASE_URL });

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
