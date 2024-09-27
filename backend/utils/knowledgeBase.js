import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import logger from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let knowledgeBase = null;

export const getKnowledgeBase = async () => {
  if (knowledgeBase) return knowledgeBase;

  try {
    const knowledgeBasePath = path.join(__dirname, '..', 'data', 'knowledge_base.txt');
    knowledgeBase = await fs.readFile(knowledgeBasePath, "utf-8");
    logger.info("Knowledge base loaded successfully");
    return knowledgeBase;
  } catch (error) {
    logger.error("Error loading knowledge base:", error);
    throw error;
  }
};