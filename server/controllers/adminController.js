import * as Admin from "../models/adminModel.js";
import { assignRoleToUser } from "../models/userModel.js";
import pool from "../config/db.js";

/* ---------- STATS ---------- */
export const getAdminStats = async (req, res) => {
  const stats = await Admin.fetchAdminStats();
  res.json(stats);
};



export const getPendingApprovals = async (req, res) => {
  const data = await Admin.getAllPendingApprovals();
  res.json(data);
};

export const updateApprovalStatus = async (req, res) => {
  const { id, type, action } = req.params;
  const newStatus = action === "approve" ? "approved" : "rejected";

  try {
    let userId;

    if (type === "seller") {
      // Get the actual user_id from the sellers table
      const sellerResult = await pool.query(
        "SELECT user_id FROM sellers WHERE id = $1",
        [id]
      );

      if (sellerResult.rows.length === 0) {
        return res.status(404).json({ message: "Seller not found" });
      }

      userId = sellerResult.rows[0].user_id;

      await Admin.updateSellerStatus(id, newStatus);

      // Only assign role on approval
      if (action === "approve") {
        await assignRoleToUser(userId, "seller");
      }

    } else if (type === "labeler") {
      const labelerResult = await pool.query(
        "SELECT user_id FROM labelers WHERE id = $1",
        [id]
      );

      if (labelerResult.rows.length === 0) {
        return res.status(404).json({ message: "Labeler not found" });
      }

      userId = labelerResult.rows[0].user_id;

      await Admin.updateLabelerStatus(id, newStatus);

      if (action === "approve") {
        await assignRoleToUser(userId, "labeler");
      }

    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    res.json({ 
      message: `${type} ${newStatus} successfully`,
      userId // optional: for debugging/frontend
    });

  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ message: "Server error during approval" });
  }
};