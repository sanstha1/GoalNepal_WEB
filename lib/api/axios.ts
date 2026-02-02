import axios from "axios";
import { getAuthToken } from "../cookie";

const BASE_URL = 'http://localhost:5050';
const axiosInstance  = axios.create(
    {
        baseURL : BASE_URL,
        headers: {
            "Content-Type" : "application/json",
        },
        // Remove withCredentials for now to avoid CORS issues
        // Your backend should handle cookies automatically for same-origin requests
    }
)

axiosInstance.interceptors.request.use(
  async (config) => {
        const token = await getAuthToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);

export default axiosInstance;
