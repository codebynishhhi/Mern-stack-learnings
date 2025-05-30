import dotenv from "dotenv"
dotenv.config()
export const PORT = 5555;
export const mongoDbUrl = process.env.MONGODB_URI;