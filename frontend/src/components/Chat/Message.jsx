import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const formatMessage = (text) => {
  // Remove extra newlines
  text = text.replace(/\n{3,}/g, "\n\n");
  // Ensure proper spacing for bold text
  text = text.replace(/(\*\*[^*]+\*\*)/g, " $1 ");
  return text.trim();
};

const Message = ({ message }) => (
  <div
    className={`flex ${message.isAi ? "justify-start" : "justify-end"} mb-4`}
  >
    <motion.div
      initial={{ opacity: 0, x: message.isAi ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`message p-4 rounded-xl shadow-md relative inline-block max-w-[90%] ${
        message.isAi
          ? "bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-800 ml-2"
          : "bg-gradient-to-br from-emerald-50 to-teal-50 text-gray-800 mr-2"
      }`}
    >
      <div
        className={`absolute w-0 h-0 border-solid ${
          message.isAi
            ? "border-r-[12px] border-r-indigo-50 border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent left-[-12px] top-4"
            : "border-l-[12px] border-l-emerald-50 border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent right-[-12px] top-4"
        }`}
      ></div>
      <ReactMarkdown
        className="prose prose-sm markdown-content max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        components={{
          p: ({ node, ...props }) => (
            <p className="my-2 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="pl-5 my-2 space-y-1 list-disc" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="pl-8 my-2 space-y-2 list-decimal" {...props} />
          ),
          li: ({ node, ordered, ...props }) => (
            <li className="pl-1 my-1" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 className="my-3 text-xl font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="my-3 text-lg font-semibold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="my-2 text-base font-medium" {...props} />
          ),
          code: ({ node, inline, ...props }) => 
            inline ? (
              <code
                className="px-1 py-0.5 rounded bg-gray-100 text-sm font-mono"
                {...props}
              />
            ) : (
              <code
                className="block p-2 my-2 overflow-x-auto font-mono text-sm bg-gray-100 rounded"
                {...props}
              />
            ),
          pre: ({ node, ...props }) => (
            <pre
              className="p-3 my-2 overflow-x-auto bg-gray-100 rounded-lg"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="pl-4 my-2 italic border-l-4 border-gray-300"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img className="h-auto max-w-full my-2 rounded" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="my-2 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap" {...props} />
          ),
        }}
      >
        {formatMessage(message.text)}
      </ReactMarkdown>
    </motion.div>
  </div>
);

export default React.memo(Message);
