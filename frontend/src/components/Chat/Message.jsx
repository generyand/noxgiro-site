import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const formatMessage = (text) => {
  text = text.replace(/^(-|\d+\.)\s+/gm, '$1 ');
  text = text.replace(/(\*\*[^*]+\*\*)/g, '\n\n$1\n');
  return text.trim();
};

const Message = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`message p-3 rounded-lg ${
      message.isAi ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
    }`}
  >
    {message.isAi ? (
      <ReactMarkdown
        className="prose-sm prose markdown-content max-w-none"
        components={{
          ul: ({ node, ...props }) => node.children.length > 0 ? <ul {...props} /> : null,
          ol: ({ node, ...props }) => node.children.length > 0 ? <ol {...props} /> : null,
        }}
      >
        {formatMessage(message.text)}
      </ReactMarkdown>
    ) : (
      <p>{message.text}</p>
    )}
  </motion.div>
);

export default React.memo(Message);
