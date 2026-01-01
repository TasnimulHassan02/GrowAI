import { createDatasetRequest, getAllRequests } from "../models/datasetRequestModel.js";

export const submitDatasetRequest = async (req, res) => {
  try {
    const userId = req.user.id;

    const request = await createDatasetRequest(userId, req.body);

    res.status(201).json({
      message: "Dataset request submitted successfully",
      request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit request" });
  }
};

export const fetchAllRequests = async (req, res) => {
  try {
    const requests = await getAllRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};
