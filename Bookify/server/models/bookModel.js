import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
    description: { type: String, required: true },
    pages: { type: Number, required: false },
  },
  {
    timeStamps: true,
  }
);
export const BookModel = mongoose.model("Book", BookSchema);
