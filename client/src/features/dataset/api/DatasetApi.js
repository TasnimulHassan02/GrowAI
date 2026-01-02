import api from "../../../api/axios";

export const fetchDatasets = (params) =>
  api.get("/datasets", { params }).then(res => res.data);

export const fetchDatasetDetails = (id) =>
  api.get(`/datasets/${id}`).then(res => res.data);
