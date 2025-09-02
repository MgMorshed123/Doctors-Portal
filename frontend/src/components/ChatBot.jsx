import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

export const Chatbot = () => {
  // console.log();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // console.log(import.meta.env.VITE_GROQ_API_KEY);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // ✅ Groq API call
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile", // or "mixtral-8x7b-instruct"
            messages: [{ role: "user", content: input }],
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      const aiResponse =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't process that. Try again!";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Groq API Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not connect to Groq API." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 bg-background-light dark:bg-background-dark rounded-lg shadow-xl w-80 max-h-96 flex flex-col overflow-hidden z-50 glow-effect"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {/* Header */}
          <div className="p-4 bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">HM Medical Assistant</h3>
            <button
              onClick={handleClearChat}
              className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
              aria-label="Clear chat"
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            className="flex-1 p-4 overflow-y-auto text-text-light dark:text-text-dark"
            ref={chatContainerRef}
          >
            {messages.length === 0 ? (
              <p className="text-secondary-light dark:text-secondary-dark text-sm text-center">
                Ask me anything about Health & Disease
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-primary-light/10 dark:bg-primary-dark/10 ml-8"
                      : "bg-accent-light/10 dark:bg-accent-dark/10 mr-8"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    {msg.role === "user" ? "You" : "Assistant"}
                  </p>
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))
            )}
            {isLoading && (
              <div className="text-center text-secondary-light dark:text-secondary-dark text-sm">
                Typing...
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-secondary-light/50 dark:border-secondary-dark/50">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 p-2 border border-secondary-light/50 dark:border-secondary-dark/50 rounded bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                aria-label="Chat input"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`p-2 bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark rounded hover:bg-primary-light/90 dark:hover:bg-accent-dark/90 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Send message"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};
