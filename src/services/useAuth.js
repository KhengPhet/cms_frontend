import API from "./api";

export const loginAPI = (data) => API.post("/auth/login", data);

export const registerAPI = (data) =>
  API.post("/auth/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};