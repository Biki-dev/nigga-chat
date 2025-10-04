import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api" // local backend when developing
      : import.meta.env.VITE_API_URL, // backend URL on Render
  withCredentials: true,
});
