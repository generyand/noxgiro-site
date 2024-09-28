import React from "react";
import Markdown from "markdown-to-jsx";
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
      <Markdown
        options={{
          overrides: {
            p: {
              props: {
                className: "my-2 leading-relaxed",
              },
            },
            ul: {
              props: {
                className: "pl-5 my-2 space-y-1 list-disc",
              },
            },
            ol: {
              props: {
                className: "pl-8 my-2 space-y-2 list-decimal",
              },
            },
            li: {
              props: {
                className: "pl-1 my-1",
              },
            },
            h1: {
              props: {
                className: "my-3 text-xl font-bold",
              },
            },
            h2: {
              props: {
                className: "my-3 text-lg font-semibold",
              },
            },
            h3: {
              props: {
                className: "my-2 text-base font-medium",
              },
            },
            code: {
              component: CodeBlock,
            },
            pre: {
              props: {
                className: "p-3 my-2 overflow-x-auto bg-gray-100 rounded-lg",
              },
            },
            blockquote: {
              props: {
                className: "pl-4 my-2 italic border-l-4 border-gray-300",
              },
            },
            a: {
              props: {
                className: "text-blue-600 hover:underline",
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
            img: {
              props: {
                className: "h-auto max-w-full my-2 rounded",
              },
            },
            table: {
              props: {
                className: "min-w-full divide-y divide-gray-200 my-2",
              },
              component: ResponsiveTable,
            },
            th: {
              props: {
                className: "px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50",
              },
            },
            td: {
              props: {
                className: "px-3 py-2 text-sm text-gray-500 whitespace-normal break-words",
              },
            },
          },
        }}
      >
        {formatMessage(message.text)}
      </Markdown>
    </motion.div>
  </div>
);

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, '') : '';
  return (
    <pre className={`p-2 my-2 overflow-x-auto font-mono text-sm bg-gray-100 rounded ${className}`}>
      <code className={language}>{children}</code>
    </pre>
  );
};

const ResponsiveTable = ({ children, ...props }) => (
  <div className="max-w-full overflow-x-auto">
    <table {...props}>{children}</table>
  </div>
);

export default React.memo(Message);
