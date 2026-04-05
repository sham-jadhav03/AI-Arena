import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq";
import config from "../config/config.js";

export const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: config.GOOGLE_API_KEY,
});

export const mistralAIModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRALAI_API_KEY,
});

export const openAIModel = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: config.OPENAI_API_KEY,
});
