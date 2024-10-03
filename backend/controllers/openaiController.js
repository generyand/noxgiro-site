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

      Please provide a helpful and accurate response based on the information above. Follow these guidelines:

      1. If the query is relevant to NoxGiro's business, products, or services:
         - Answer using the provided knowledge base.
         - Use natural language for simple answers.
         - Use markdown formatting only when it enhances readability or structure.

      2. If the query is about something not covered in the provided information, but still relevant to NoxGiro:
         - Politely state that you don't have that specific information.
         - Assure the user that you'll be updated soon.
         - Example: "I apologize, but I don't have that specific information in my current knowledge base. However, I'm constantly being updated, so I should have more details on this topic soon. Is there anything else I can help you with regarding NoxGiro's services?"

      3. If the query is completely irrelevant to NoxGiro's business, products, or services:
         - Politely inform the user that the question is not related to NoxGiro.
         - Offer to assist with relevant topics instead.
         - Example: "I apologize, but your question doesn't seem to be related to NoxGiro's services or products. As an AI assistant for NoxGiro, I'm best equipped to help with queries about our business. Would you like information about any of NoxGiro's offerings instead?"

      When using markdown, you may use:
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

      Always prioritize clarity and conciseness. Use markdown only when it significantly improves the presentation of information. Maintain a helpful, friendly, and professional tone in all responses, regardless of the nature of the query.
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
