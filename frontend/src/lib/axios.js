import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://nigga-chat.onrender.com" : "/api",
  withCredentials: true,
});
