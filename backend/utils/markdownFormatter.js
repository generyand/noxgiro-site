export function formatMarkdown(text) {
  // Ensure code blocks have language specifiers
  text = text.replace(/```(\w+)\n/g, (match, lang) => {
    return `\`\`\`${lang.toLowerCase()}\n`;
  });

  // Ensure proper spacing around headings
  text = text.replace(/\n(#+)\s*(.+)/g, '\n\n$1 $2\n');

  // Add more formatting rules as needed

  return text;
}
