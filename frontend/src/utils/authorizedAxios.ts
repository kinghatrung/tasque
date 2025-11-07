import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner";

const authorizedAxiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 60 * 10,
  withCredentials: true,
});

// 🟢 REQUEST INTERCEPTOR
authorizedAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 🟠 RESPONSE INTERCEPTOR
authorizedAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
