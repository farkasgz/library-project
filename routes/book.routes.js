// routes/book.routes.js

const router = require("express").Router();

const Book = require("../models/Book.model.js"); // <== add this line before your routes

// GET route to retrieve and display all the books
router.get("/books", (req, res, next) => {
  Book.find()
    .then((allTheBooksFromDB) => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log("Retrieved books from DB:", allTheBooksFromDB);

      res.render("books/books-list.ejs", { books: allTheBooksFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get("/books/create", (req, res) => res.render("books/book-create.ejs"));

router.post("/books/create", (req, res, next) => {
  const { title, author, description, rating } = req.body;
  Book.create({ title, author, description, rating })
    .then(() => res.redirect("/books"))
    .catch((error) => next(error));
});

router.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  Book.findById(bookId)
    .then((theBook) => res.render("books/book-details.ejs", { book: theBook }))
    .catch((error) => {
      console.log("Error while retrieving book details", error);
      next(error);
    });
});

module.exports = router;
