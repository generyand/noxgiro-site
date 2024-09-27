import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL as needed

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('ai message', (msg) => {
      setMessages(prevMessages => [...prevMessages, { text: msg, isAi: true }]);
      setIsAiTyping(false);
    });

    // Listen for 'typing' indicator
    socket.on('ai typing', () => {
      setIsAiTyping(true);
    });

    // Listen for errors
    socket.on('error', (errorMsg) => {
      console.error('Socket error:', errorMsg);
      // You might want to display this error to the user
    });

    // Cleanup on component unmount
    return () => {
      socket.off('ai message');
      socket.off('ai typing');
      socket.off('error');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // Add user message to the chat
      setMessages(prevMessages => [...prevMessages, { text: inputMessage, isAi: false }]);
      // Send message to server
      socket.emit('chat message', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isAi ? 'ai' : 'user'}`}>
            {msg.text}
          </div>
        ))}
        {isAiTyping && <div className="typing-indicator">AI is typing...</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatComponent;