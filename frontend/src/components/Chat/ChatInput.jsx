import React, { useState, useCallback } from 'react';

const ChatInput = ({ onSubmit }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(inputMessage);
    setInputMessage('');
  }, [inputMessage, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 text-gray-900 border border-gray-300 rounded-md message-input focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
};

export default React.memo(ChatInput);
