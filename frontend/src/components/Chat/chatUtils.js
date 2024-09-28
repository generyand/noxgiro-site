const startingMessages = [
  "Welcome to Noxgiro! I'm here to help you explore our innovative solutions. What would you like to know about our services?",
  "Hello! Excited to assist you with Noxgiro's cutting-edge offerings. Which area of our expertise interests you most?",
  "Greetings from Noxgiro! How can I guide you through our transformative technologies today?",
  "Welcome aboard! Ready to discover how Noxgiro can revolutionize your business? What's your primary focus?",
  "Hi there! Noxgiro's AI assistant at your service. What aspect of our solutions would you like to explore first?",
  "Great to see you! Noxgiro's innovation awaits. Where shall we begin our journey of discovery?",
  "Welcome to the future with Noxgiro! I'm here to showcase our groundbreaking solutions. What piques your interest?",
  "Hello and welcome! Eager to help you unlock Noxgiro's potential for your business. What's on your mind?",
  "Greetings! Ready to dive into Noxgiro's world of innovation? Which of our services intrigues you the most?",
  "Welcome to Noxgiro's virtual assistant! I'm here to guide you through our cutting-edge offerings. Where should we start?",
];

export const getRandomStartingMessage = () => {
  const randomIndex = Math.floor(Math.random() * startingMessages.length);
  return startingMessages[randomIndex];
};
