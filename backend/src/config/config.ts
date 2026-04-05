import dotenv from 'dotenv'

dotenv.config();

const config = {
  GOOGLE_API_KEY:process.env.GOOGLE_API_KEY || '',
  MISTRALAI_API_KEY:process.env.MISTRALAI_API_KEY || '',
  OPENAI_API_KEY:process.env.OPENAI_API_KEY || '',
 }

export default config;