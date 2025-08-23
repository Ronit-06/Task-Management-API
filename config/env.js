import { config } from "dotenv";

config({ path: ".env.development.local" });

export const { PORT, MONGODB_URI } = process.env;
