import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: backendURL,
  timeout: 45000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Modify response data or handle common response scenarios
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
