import { getAllLabelers, findLabelerByUserId, createLabeler } from "../models/labelerModel.js";
import { assignRoleToUser } from "../models/userModel.js";


export const getLabelers = async (req, res) => {
  try {
    const labelers = await getAllLabelers();
    res.status(200).json(labelers);
  } catch (error) {
    console.error("Get labelers error:", error);
    res.status(500).json({ message: "Failed to fetch labelers" });
  }
};


export const registerLabeler = async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user.id;

    const {
      full_name,
      phone,
      description,
      expertise,
      payment_method,
      hourly_rate,
    } = req.body;

    if (
      !full_name ||
      !phone ||
      !expertise ||
      !payment_method ||
      hourly_rate === undefined
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingLabeler = await findLabelerByUserId(userId);
    
    if (existingLabeler.rows.length > 0) {
      return res.status(400).json({
        message: "You are already registered as a labeler",
      });
    }

    const profile_image = req.file
      ? `/uploads/labelers/${req.file.filename}`
      : null;

    const result = await createLabeler({
      user_id: userId,
      full_name,
      phone,
      description,
      profile_image,
      expertise,
      payment_method,
      hourly_rate,
    });
    assignRoleToUser(userId, "labeler");
    res.status(201).json({
      message: "Labeler registered successfully",
      labeler: result.rows[0],
    });
  } catch (error) {
    console.error("Register labeler error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
