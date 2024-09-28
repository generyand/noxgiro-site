import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const formatMessage = (text) => {
  // Remove extra newlines
  text = text.replace(/\n{3,}/g, '\n\n');
  // Ensure proper spacing for bold text
  text = text.replace(/(\*\*[^*]+\*\*)/g, ' $1 ');
  return text.trim();
};

const Message = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`message p-3 rounded-lg relative ${
      message.isAi
        ? 'bg-blue-100 text-blue-800 ml-4 mr-12'
        : 'bg-green-100 text-green-800 mr-4 ml-12'
    }`}
  >
    <div
      className={`absolute w-0 h-0 border-solid ${
        message.isAi
          ? 'border-r-[12px] border-r-blue-100 border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent left-[-12px] top-3'
          : 'border-l-[12px] border-l-green-100 border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent right-[-12px] top-3'
      }`}
    ></div>
    {message.isAi ? (
      <ReactMarkdown
        className="prose prose-sm markdown-content max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        components={{
          p: ({ node, ...props }) => <p className="my-1" {...props} />,
          ul: ({ node, ...props }) => <ul className="pl-4 my-1 list-disc" {...props} />,
          ol: ({ node, ...props }) => <ol className="pl-4 my-1 list-decimal" {...props} />,
          li: ({ node, ...props }) => <li className="my-0.5" {...props} />,
          h1: ({ node, ...props }) => <h1 className="my-2 text-xl font-bold" {...props} />,
          h2: ({ node, ...props }) => <h2 className="my-2 text-lg font-semibold" {...props} />,
          h3: ({ node, ...props }) => <h3 className="my-1 text-base font-medium" {...props} />,
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
