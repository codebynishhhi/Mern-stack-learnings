import express from "express";
import { mongoDbUrl, PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js"

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// the routes in use
app.use("/books", booksRoute);
app.use("/auth", authRoute);
app.use('/user', userRoute)

console.log(mongoDbUrl, "uri")
// we use mongoose to connect to our mongoDB database
mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "error in connection");
  });
