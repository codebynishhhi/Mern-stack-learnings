import express from "express";
import { mongoDbUrl, PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

app.use('/books', booksRoute)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// we use mongoose to connect to our mongoDB database
mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "error in connection");
  });
