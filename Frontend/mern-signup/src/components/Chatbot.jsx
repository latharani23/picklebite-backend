import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to PickleBite 💜 Ask me about pickles, prices, delivery, or orders.",
    },
  ]);

  const [userText, setUserText] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (userText.trim() === "") return;

    const newUserMessage = {
      sender: "user",
      text: userText,
    };

    // Add user message first
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await fetch(
        "https://picklebite-backend.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userText,
          }),
        },
      );

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.reply,
      };

      // Add only bot reply
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: "Server error. Please try again later.",
      };

      // Add only error message
      setMessages((prev) => [...prev, errorMessage]);
    }

    setUserText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div className="chatbot-icon" onClick={toggleChat}>
        💬
      </div>

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>PickleBite Assistant</h3>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "user-message" : "bot-message"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask about pickles..."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
