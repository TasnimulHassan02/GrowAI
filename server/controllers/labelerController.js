import { getAllLabelers } from "../models/labelerModel.js";


export const getLabelers = async (req, res) => {
  try {
    const labelers = await getAllLabelers();
    res.status(200).json(labelers);
  } catch (error) {
    console.error("Get labelers error:", error);
    res.status(500).json({ message: "Failed to fetch labelers" });
  }
};

