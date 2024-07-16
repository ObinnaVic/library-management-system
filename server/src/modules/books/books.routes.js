const express = require("express");
const validate = require("../../middlewares/validate.js");
const {
  borrowBook,
  createBook,
  deleteBook,
  queryBooks,
  returnBook,
  reviewBook,
  updateBook,
} = require("../../validations/book.validation.js");
const verifyToken = require("../../middlewares/verifyToken.js");
const booksController = require("./books.controller.js");

const BookRoutes = express.Router();

//Test Routes
BookRoutes.route("/test").post(
  validate(createBook),
  booksController.testAddNewBook
);
BookRoutes.route("/test/:bookID")
  .put(validate(updateBook), booksController.testUpdateBook)
  .delete(validate(deleteBook), booksController.testRemoveBook);

//routes to add new books and get all books
BookRoutes.route("/")
  .post(validate(createBook), verifyToken, booksController.httpAddNewBook)
  .get(verifyToken, booksController.httpGetAllBooks);

//routes to update and remove books
BookRoutes.route("/:bookID")
  .put(validate(updateBook), verifyToken, booksController.httpUpdateBook)
  .delete(validate(deleteBook), verifyToken, booksController.httpRemoveBook);

//routes to query for books using filters (/query?filter="")
BookRoutes.route("/query").get(
  validate(queryBooks),
  verifyToken,
  booksController.httpQueryBooks
);

//routes to borrow books
BookRoutes.route("/borrow/:bookID").post(
  validate(borrowBook),
  verifyToken,
  booksController.httpBorrowBook
);

//routes to return books
BookRoutes.route("/return/:bookID").post(
  validate(returnBook),
  verifyToken,
  booksController.httpReturnBook
);

//routes to get all borrowed books
BookRoutes.route("/borrows").get(verifyToken, booksController.httpGetBorrows);

//routes to get all histories
BookRoutes.route("/histories").get(
  verifyToken,
  booksController.httpGetHistories
);

//routes to review books
BookRoutes.route("/review/:bookID").post(
  validate(reviewBook),
  verifyToken,
  booksController.httpBookReview
);

module.exports = BookRoutes;
