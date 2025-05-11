import express from "express";
import { mongoDbUrl, PORT } from "./config.js";
import mongoose from "mongoose";
import { BookModel } from "./models/bookModel.js";
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get the list of all the books from db
app.get('/books/all', async(req, res) => {
 try{
   const books = await BookModel.find({})
   return res.status(200).json({
    count : books.length,
    data:books
  })
 }
 catch(error){
  console.log(error.message);
  
 }
})

// api to create/post a new book to db
app.post("/book/create", async (req,res) =>{
  try{
    if(!req.body.title || !req.body.author || !req.body.publishYear || !req.body.description){
      res.status(401).send({message:"Invalid body send all the required fields.!"})
    }
    const newBook = {
      title:req.body.title,
      author:req.body.author,
      publishYear : req.body.publishYear,
      description : req.body.description,
      pages:req.body.pages
    }

    const book = await BookModel.create(newBook)
    return res.status(201).send({message:"New book added successfully.!"})
  }
  catch(error){
    console.log(error.message);
    res.status(404).send({message:"Book cannot be added"})
  }
})

// get a book by id
app.get('/book/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Failed to fetch book details!" });
  }
});


// edit a book by id
app.put('/book/edit/:id', async (req, res) => {
    try {
    const { id } = req.params;
    if(!req.body.title || !req.body.author || !req.body.publishYear || !req.body.description){
      res.status(401).send({message:"Invalid body send all the required fields.!"})
    }
    const book = await BookModel.findByIdAndUpdate(id, req.body);

    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }

    return res.status(200).send({message:"Book updated successfully.!"})
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Failed to edit book details!" });
  }
})

// delete a book
app.delete('/book/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const book = await BookModel.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }

    return res.status(200).send({message:"Book deleted successfully.!"})
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Failed to delete book details!" });
  }
})

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
