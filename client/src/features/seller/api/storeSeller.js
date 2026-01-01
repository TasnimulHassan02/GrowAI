import api from "../../../api/axios";

export const storeSeller = async (data) => {
    const response = await api.post("/sellers/register", data, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
    },
    });
  return response.data;
};
