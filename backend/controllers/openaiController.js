import { openai } from '../config/openaiConfig.js';
import { getKnowledgeBase } from '../utils/knowledgeBase.js';
import logger from '../utils/logger.js';

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

      Please provide a helpful and accurate response based on the information above.
    `;

    logger.info("Constructed prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
    });

    const response = completion.choices[0].message.content;
    logger.info("AI response:", response);

    return response;
  } catch (error) {
    logger.error("OpenAI API error:", error);
    throw error;
  }
};
