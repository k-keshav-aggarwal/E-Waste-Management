import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Add CSS for styling

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Typing indicator state
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  // Function to scroll to the bottom of the chat messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Automatically scroll to the bottom when conversation updates
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to the conversation
    setConversation((prev) => [...prev, { sender: 'user', text: message }]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Send message to the backend
      const response = await axios.post('http://localhost:3000/chat-bot', { message });
      const botResponse = response.data;

      // Add bot response to the conversation
      setConversation((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error communicating with chatbot backend:', error);
      setConversation((prev) => [...prev, { sender: 'bot', text: 'Error: Unable to get response.' }]);
    } finally {
      // Hide typing indicator
      setIsTyping(false);
    }

    // Clear input
    setMessage('');
  };

  return (
    <div className="chatbot">
      {/* Chat Icon - Conditionally Render */}
      {!isChatVisible && (
        <button className="chat-icon" onClick={toggleChat}>
          💬
        </button>
      )}

      {/* Chat Window */}
      {isChatVisible && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chatbot</h3>
            <button className="close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>
          <div className="chat-messages">
            {conversation.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {/* Typing Indicator */}
            {isTyping && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            )}
            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button className="send-btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;