import api from "../../../api/axios";

export const getLabelers = async (token) => {
  const response = await api.get("/labelers", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    },
  });
  return response.data;
};

