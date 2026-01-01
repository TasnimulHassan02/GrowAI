import api from "../../../api/axios";

export const storeLabeler = async (formData) => {
  const response = await api.post("/labelers/register", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
