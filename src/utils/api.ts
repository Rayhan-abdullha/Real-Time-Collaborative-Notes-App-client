import { EXPRESS_VERSION_URL } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = EXPRESS_VERSION_URL
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

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
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await api.post("/auth/refresh-token", {}, { withCredentials: true });
    Cookies.set("accessToken", response.data.data.accessToken);
  } catch (error) {
    console.error("Error refreshing access token", error);
  }
};

export default api;
