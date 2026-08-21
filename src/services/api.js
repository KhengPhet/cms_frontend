import axios from "axios";

// Normalize: accept VITE_API_URL with or without "/api"
// "https://xxx.up.railway.app"      -> "https://xxx.up.railway.app/api"
// "https://xxx.up.railway.app/api/" -> "https://xxx.up.railway.app/api"
const raw = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const baseURL = raw.endsWith("/api") ? raw : `${raw}/api`;

if (!raw) {
  console.error("VITE_API_URL is not set! Check .env / Vercel environment variables.");
}

const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
