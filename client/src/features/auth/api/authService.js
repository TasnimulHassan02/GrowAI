import api from "../../../api/axios";

export const login = (data) =>
  api.post("/auth/login", data);

export const register = (data) =>
  api.post("/auth/register", data);

export const googleAuth = (data) => {
  return api.post("/auth/google", data);
};
