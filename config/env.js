import { config } from "dotenv";

// Load environment variables from .env file instead of .env by default

config({ path: ".env.development.local" });

// Export environment variables

export const { PORT, MONGODB_URI, JWT_SECRET, EMAIL_PASSWORD, EMAIL, ARCJET_KEY, ARCJET_ENV, REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;
