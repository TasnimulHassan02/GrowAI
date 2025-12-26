import api from "../../../api/axios";

export const getConversations = () => {
  return api.get("/messages/conversations");
};

export const getConversation = (conversationId, params = {}) => {
  return api.get(`/messages/conversations/${conversationId}`, { params });
};

export const sendMessage = (data) => {
  return api.post("/messages/send", data);
};

export const getUnreadMessageCount = () => {
  return api.get("/messages/unread-count");
};

