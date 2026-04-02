import dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL || 'https://www.amazon.com',
  searchTerm: process.env.SEARCH_TERM || 'macbook',
  timeout: Number(process.env.TIMEOUT || 30000),
  headless: (process.env.HEADLESS || 'true').toLowerCase() === 'true'
};
