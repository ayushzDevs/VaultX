import { config } from "dotenv"
import path from "path"

const envPath = path.resolve(__dirname, "../config/.env")
console.log("Resolving env from:", envPath)

const result = config({ path: envPath })
if (result.error) {
  console.error("Failed to load .env:", result.error)
}

export const APP_PORT = Number(process.env.APP_PORT);
export const FRONTEND_URL = process.env.FRONTEND_URL;