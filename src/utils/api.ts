// app/utils/api.ts
import { EXPRESS_VERSION_URL } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = EXPRESS_VERSION_URL
// Set base URL for API requests
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // This is important for sending cookies with requests
});

// Interceptor to include the access token in request headers
api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle token refresh automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message === "Unauthorized"
    ) {
      originalRequest._retry = true;
      await refreshAccessToken();
      return api(originalRequest); // Retry the original request
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await api.post("/auth/refresh-token");
    Cookies.set("accessToken", response.data.data.accessToken); // Save new access token
  } catch (error) {
    console.error("Error refreshing access token", error);
  }
};

export default api;
