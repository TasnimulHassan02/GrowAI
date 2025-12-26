import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../api/messageService";
import { MessageSquare } from "lucide-react";

function StartConversationButton({ sellerId, sellerName, datasetId = null, jobId = null, subject = null }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartConversation = async () => {
    if (!sellerId) {
      alert("Seller information is missing");
      return;
    }

    try {
      setLoading(true);
      // Create conversation and send initial message
      const response = await sendMessage({
        sellerId,
        datasetId,
        jobId,
        subject: subject || `Inquiry about ${datasetId ? "dataset" : "job"}`,
        message: `Hello ${sellerName}, I would like to discuss ${datasetId ? "this dataset" : "this job request"}.`,
      });

      // Navigate to messages page with the conversation
      navigate("/messages", { state: { conversationId: response.data.conversation.id } });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert("Failed to start conversation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleStartConversation}
      disabled={loading}
      className="btn btn-primary btn-sm gap-2"
    >
      <MessageSquare className="w-4 h-4" />
      {loading ? "Starting..." : "Message Seller"}
    </button>
  );
}

export default StartConversationButton;

