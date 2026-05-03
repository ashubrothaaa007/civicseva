import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function listModels() {
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    console.log("Testing gemini-2.5-flash...");
    const result = await models.generateContent("Hi");
    console.log("Success with gemini-2.5-flash:", result.response.text());
  } catch (e) {
    console.error("Error with gemini-2.5-flash:", e.message);
  }
}

listModels();
