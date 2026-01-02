import { findSellerByUserId, createSeller } from "../models/sellerModel.js";
import { assignRoleToUser } from "../models/userModel.js";

export const registerSeller = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      full_name,
      phone,
      organization,
      data_type,
      payment_method,
      description,
    } = req.body;

    if (!full_name || !phone || !data_type || !payment_method) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await findSellerByUserId(userId);
    if (existing.rows.length > 0) {
      return res.status(401).json({ message: "Already a seller" });
    }

    const photo = req.file
      ? `/uploads/sellers/${req.file.filename}`
      : null;

    const seller = await createSeller({
      user_id: userId,
      full_name,
      phone,
      organization,
      data_type,
      payment_method,
      description,
      photo,
    });

    res.status(201).json({
      message: "Seller registered successfully",
      seller: seller.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
