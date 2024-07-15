const httpStatus = require("http-status");
const booksService = require("./books.service.js");
const pick = require("../../utils/pick.js");

const httpGetAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks();

    res.status(httpStatus.OK).json(books);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpAddNewBook = async (req, res) => {
  try {
    const userRole = req.user.role;

    //Members cant add books
    if (userRole === "Member") {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "User not Authorized" });
    }

    const success = await booksService.addNewBook(req.body);

    res.status(httpStatus.CREATED).json(success);
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json(error);
  }
};

const httpQueryBooks = async (req, res) => {
  try {
    const filter = pick(req.query, [
      "title",
      "author",
      "genre",
      "rating",
      "availability",
    ]);

    const books = await booksService.queryBooks(filter);

    res.status(httpStatus.OK).json(books);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpRemoveBook = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole === "Member") {
      //Members cant remove books
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "User not Authorized" });
    }

    const { bookID } = req.params;

    const result = await booksService.removeBook(bookID);

    res.status(httpStatus.OK).json({result});
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpUpdateBook = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole === "Member") {
      //Members cant update books
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "User not Authorized" });
    }

    const { bookID } = req.params;
    const update = req.body

    const updated = await booksService.updateBook(bookID, update);

    res.status(httpStatus.OK).json(updated);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpBorrowBook = async (req, res) => {
  try {
    const userID = req.user.id;
    const { bookID } = req.params;
    const { startDate } = req.body;

    const result = await booksService.borrowBook(userID, bookID, startDate);

    res.status(httpStatus.OK).json({ result });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpReturnBook = async (req, res) => {
  try {
    const userID = req.user.id;
    const { bookID } = req.params;
    const { endDate } = req.body;

    const result = await booksService.returnBook(userID, bookID, endDate);

    res.status(httpStatus.OK).json({ result });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpGetBorrows = async (req, res) => {
  try {
    const borrows = await booksService.getAllBorrows();

    res.status(httpStatus.OK).json(borrows);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpGetHistories = async (req, res) => {
  try {
    const histories = await booksService.getHistories();

    res.status(httpStatus.OK).json(histories);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpBookReview = async (req, res) => {
  try {
    const userID = req.user.id;
    const { bookID } = req.params;
    const { rate, review } = req.body;

    const result = await booksService.bookReview(userID, bookID, rate, review);

    res.status(httpStatus.OK).json({ result });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

module.exports = {
  httpGetAllBooks,
  httpAddNewBook,
  httpQueryBooks,
  httpRemoveBook,
  httpUpdateBook,
  httpBorrowBook,
  httpReturnBook,
  httpGetBorrows,
  httpGetHistories,
  httpBookReview,
};
