import { openai } from '../config/openaiConfig.js';
import { getKnowledgeBase } from '../utils/knowledgeBase.js';
import logger from '../utils/logger.js';
import { formatMarkdown } from '../utils/markdownFormatter.js';

export const getChatResponse = async (req, res) => {
  try {
    logger.info("Received request body:", req.body);

    if (!req.body?.message) {
      return res.status(400).json({ error: "Missing message in request body" });
    }

    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    logger.error("OpenAI API error:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};

export const getChatResponseForSocket = async (message) => {
  try {
    const knowledgeBase = await getKnowledgeBase();
    const prompt = `
      You are an AI assistant for NoxGiro. Use the following information to answer user queries:

      ${knowledgeBase}

      User query: ${message}

      Please provide a helpful and accurate response based on the information above. Use natural language for simple answers. Only use markdown formatting when it enhances readability or structure, such as for complex explanations, lists, or code examples. When markdown is appropriate, you may use:

      - **Bold** for emphasis or important terms
      - *Italics* for slight emphasis or technical terms
      - Headings with # for main topics and ## for subtopics
      - Bullet points or numbered lists for multiple items
      - \`Inline code\` for short code snippets or commands
      - Code blocks for longer code examples
      - > For quotations or important notes
      - Horizontal rules (---) to separate sections if needed
      - [Links](URL) for references or additional resources
      - Tables for structured data if necessary

      Prioritize clarity and conciseness in your response. Use markdown only when it significantly improves the presentation of information.
    `;

    logger.info("Constructed prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
    });

    let response = completion.choices[0].message.content;
    response = formatMarkdown(response); // Apply additional formatting
    logger.info("Formatted AI response:", response);

    return response;
  } catch (error) {
    logger.error("OpenAI API error:", error);
    throw error;
  }
};
