import { login } from "../api/authService";

export const useAuth = () => {
  const loginUser = async (credentials) => {
    const res = await login(credentials);
    localStorage.setItem("token", res.data.token);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { loginUser, logout };
};
