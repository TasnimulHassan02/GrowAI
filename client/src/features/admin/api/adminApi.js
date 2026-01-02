import api from "../../../api/axios";

// Dashboard stats
export const fetchAdminStats = async () => {
  const res = await api.get("/admin/stats", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(res.data)
  return res.data;
};

export const fetchPendingApprovals = async () => {
  const res = await api.get("/admin/approvals/pending", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const updateApprovalStatus = async ({ id, type, action }) => {
  const res = await api.patch(
    `/admin/${type}/${id}/${action}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};
