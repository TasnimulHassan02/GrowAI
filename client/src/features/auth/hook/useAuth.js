import { login } from "../api/authService";

export const useAuth = () => {
  const loginUser = async (credentials) => {
    const res = await login(credentials);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    // Store user info if provided
    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { loginUser, logout };
};
