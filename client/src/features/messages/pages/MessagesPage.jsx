import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useMessages } from "../hooks/useMessages";
import { getConversation, sendMessage } from "../api/messageService";
import { Send, MessageSquare } from "lucide-react";
import { getUserIdFromToken } from "../../../utils/auth";
import StartConversationButton from "../components/StartConversationButton";

function MessagesPage() {
  const location = useLocation();
  const { conversations, loading: conversationsLoading, refetch } = useMessages();

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

const messagesContainerRef = useRef(null);

const scrollToBottom = () => {
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }
};


  /* 🔹 Auto open conversation if navigated from StartConversationButton */
  useEffect(() => {
    if (location.state?.conversationId && conversations.length > 0) {
      const conv = conversations.find(
        (c) => c.id === location.state.conversationId
      );
      if (conv) setSelectedConversation(conv);
    }
  }, [location.state, conversations]);

  useEffect(() => {
    if (selectedConversation) loadMessages(selectedConversation.id);
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async (conversationId) => {
    try {
      setLoadingMessages(true);
      const res = await getConversation(conversationId);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Load messages error:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      await sendMessage({
        conversationId: selectedConversation.id,
        message: newMessage.trim(),
      });
      setNewMessage("");
      await loadMessages(selectedConversation.id);
      refetch();
    } catch {
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div
          className="bg-white border-4 border-primary rounded-2xl shadow-lg overflow-hidden h-full"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className="flex h-full">
            {/* LEFT — Conversations */}
            <div className="w-1/3 border-r border-primary flex flex-col">
              <div className="p-4 border-b border-primary">
                <h2 className="text-xl font-bold">Messages</h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversationsLoading ? (
                  <div className="p-6 text-center">Loading...</div>
                ) : conversations.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    No conversations yet
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 cursor-pointer border-b border-primary hover:bg-gray-50 ${
                        selectedConversation?.id === conv.id
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <h3 className="font-semibold truncate">
                        {conv.other_user_name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {conv.last_message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT — Chat */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b  bg-gray-50">
                    <h3 className="font-semibold">
                      {selectedConversation.other_user_name}
                    </h3>
                    {selectedConversation.subject && (
                      <p className="text-sm text-gray-500">
                        {selectedConversation.subject}
                      </p>
                    )}
                  </div>

                  <div
                      ref={messagesContainerRef}
                      className="flex-1 overflow-y-auto p-4 space-y-3"
                    >

                    {loadingMessages ? (
                      <div className="text-center">Loading...</div>
                    ) : (
                      messages.map((msg) => {
                        const isOwn =
                          msg.sender_id === getUserIdFromToken();
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${
                              isOwn ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`px-4 py-2 rounded-lg max-w-md ${
                                isOwn
                                  ? "bg-primary text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              <p>{msg.message}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {formatTime(msg.created_at)}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t flex gap-2"
                  >
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border rounded-lg px-4 py-2"
                      placeholder="Type a message..."
                    />
                    <button
                      className="btn btn-primary"
                      disabled={sending}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
                  <p>Select a conversation or start a new one</p>

                  {/* ✅ Correct placement */}
                  <div className="mt-4">
                    <StartConversationButton
                      sellerId={19}
                      sellerName="Rafath"
                      datasetId={1}
                      subject="Inquiry about dataset"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MessagesPage;
