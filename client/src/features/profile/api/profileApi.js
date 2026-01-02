import api from "../../../api/axios";

export const fetchProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/profile/me", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put("/profile/change-password", data);
  return res.data;
};
