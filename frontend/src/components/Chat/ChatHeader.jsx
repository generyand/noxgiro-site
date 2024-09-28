import React from "react";
import { FaRobot } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ChatHeader = ({ onClose }) => (
  <div className="chat-header | flex items-center justify-between p-3 bg-gray-900/90 shadow-lg backdrop-blur-sm bg-opacity-20">
    <div className="flex items-center text-white">
      <FaRobot className="mr-2 text-2xl" aria-hidden="true" />
      <h2 id="chat-title" className="text-xl font-semibold">Nox</h2>
    </div>
    <button
      onClick={onClose}
      className="p-1 text-gray-300 transition-colors duration-200 rounded-full hover:bg-white hover:bg-opacity-20 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      aria-label="Close chat"
    >
      <IoClose className="text-2xl" aria-hidden="true" />
    </button>
  </div>
);

export default ChatHeader;