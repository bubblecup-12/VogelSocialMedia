import axios from "axios";
import { refreshToken } from "./refreshToken";

const excludedUrls: string[] = ["/user/login", "/user/register"];

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

// get token from local storage
const getAccessToken = () => localStorage.getItem("token");

//redirects the page to the login and back
export const redirectToLogin = (returnToPage = true) => {
  if (returnToPage) {
    const returnTo = window.location.pathname + window.location.search;
    window.location.href = `/login?returnTo=${encodeURIComponent(returnTo)}`;
  } else {
    window.location.href = "/login";
  }
};

// Request interceptor add token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// retry with new token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isExcluded = excludedUrls.some((url) =>
      originalRequest.url?.includes(url)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isExcluded
    ) {
      await refreshToken();
      originalRequest._retry = true;
      return api(originalRequest);
    }

    if (
      error.response?.status === 401 &&
      originalRequest._retry &&
      !isExcluded
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default api;
