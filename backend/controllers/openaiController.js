import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const getChatResponse = async (req, res) => {
  try {
    console.log('Received request body:', req.body); // Add this line for debugging

    if (!req.body || !req.body.message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    const { message } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in the environment variables');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

export const getChatResponseForSocket = async (message) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in the environment variables');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};