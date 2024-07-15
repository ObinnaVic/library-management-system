const ApiError = require("../../utils/ApiError.js");
const { User } = require("../user/user.model.js");
const { Book } = require("./books.model.js");

const getAllBooks = async () => {
  const books = await Book.find();

  if (!books) "No books in the Library at the moment";

  return books;
};

const addNewBook = async (book) => {
  const { title, author, ISBN, genre, publicationDate, bookCount } = book;

  //check if the book already exists in the DB, if yes, add the added book count to the old count
  if (await Book.findOne({ title })) {
    const existingBook = await Book.findOne({ title });

    const increasedCount = existingBook.bookCount + bookCount;

    await Book.updateOne(
      { title },
      { bookCount: increasedCount, availability: true }
    );

    return "Success";
  }

  const pubDate = new Date(publicationDate);
  const validDate = pubDate.toString();

  if (validDate === "Invalid Date")
    throw new ApiError(400, "Invalid date format");

  const newBook = new Book({
    title,
    author,
    ISBN,
    genre,
    publicationDate: validDate,
    reviews: [],
    bookCount,
  });

  await newBook.save();

  return newBook;
};

// Query books with filter values
const queryBooks = async (filter) => {
  const books = await Book.find(filter);

  if (!books) throw new ApiError(404, "Books not fount");

  return books;
};

//remove/delete book
const removeBook = async (id) => {
  const deleted = await Book.findOneAndDelete({ _id: id });

  if (!deleted) throw new ApiError(400, "Delete failed");

  return "Success";
};

//update book
const updateBook = async (id, update) => {
  const updated = await Book.findOneAndUpdate({ _id: id }, update, {
    upsert: true,
    new: true,
  });

  if (!updated) throw new ApiError(400, "Update Failed");

  return updated;
};

//Function to set duration of borrowed books
function borrowDuration(dateString, daysToAdd) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  const milliseconds = date.getTime();

  const addedMilliseconds = milliseconds + daysToAdd * 24 * 60 * 60 * 1000;

  const newDate = new Date(addedMilliseconds);

  const readableDate = newDate.toISOString();

  return readableDate;
}

//function to borrow books
const borrowBook = async (userID, bookID, startDate) => {
  const newStartDate = new Date(startDate);
  const validDate = newStartDate.toString();

  if (validDate === "Invalid Date")
    throw new ApiError(400, "Invalid date format");

  const book = await Book.findOne({ _id: bookID });

  if (!book) throw new ApiError(404, "Book not found");

  if (book.bookCount < 1 || book.availability == false) {
    return "Book Unavailable At the Moment";
  }

  const user = await User.findOne({ _id: userID });

  const endDate = borrowDuration(startDate, 3); // Every borrowed book has 3 days to Overdue unless duration is increased or reduced by Admin

  const borrowDetails = {
    bookID,
    title: book.title,
    genre: book.genre,
    startDate: validDate,
    endDate,
  };

  user.borrows.push(borrowDetails);

  user.history.push({ title: borrowDetails.title, date: startDate });

  await User.findOneAndUpdate(
    { _id: userID },
    { borrows: user.borrows, history: user.history }
  );

  if (book.bookCount == 1 && book.availability == true) {
    await Book.findOneAndUpdate(
      { _id: bookID },
      { bookCount: book.bookCount - 1, availability: false },
      { upsert: true }
    );
  }

  await Book.findOneAndUpdate(
    { _id: bookID },
    { bookCount: book.bookCount - 1 },
    { upsert: true }
  );

  return "Success";
};

//function to Return borrowed books
const returnBook = async (userID, bookID, endDate) => {
  const currentDate = new Date();
  const currentDateMillisec = currentDate.getTime();
  const date = new Date(endDate);

  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  const endDateMillisec = date.getTime();

  const user = await User.findOne({ _id: userID });
  const book = await Book.findOne({ _id: bookID });

  // Returning book at a date after the stipulated End date
  if (Number(currentDateMillisec) > Number(endDateMillisec)) {
    user.overdueBooks.push({ title: book.title, fee: 100 });
    await User.findOneAndUpdate(
      { _id: userID },
      { overdueBooks: user.overdueBooks }
    );
  }

  const filtered = user.borrows.filter((book) => book.bookID !== bookID);

  await User.findOneAndUpdate({ _id: userID }, { borrows: filtered });

  await Book.findOneAndUpdate(
    { _id: bookID },
    { bookCount: book.bookCount + 1, availability: true }
  );

  return "Success";
};

const getAllBorrows = async () => {
  const users = await User.find();
  console.log(users);

  const borrows = [];

  for (const user of users) {
    borrows.push(user.borrows);
  }

  return borrows;
};

const getHistories = async () => {
  const users = await User.find();

  const histories = [];

  for (const user of users) {
    histories.push(user.borrows);
  }

  return histories;
};

const bookReview = async (userID, bookID, rate, review) => {
  const user = await User.findOne({ _id: userID });
  const book = await Book.findOne({ _id: bookID });

  if (!user || !book) {
    throw new ApiError(400, "User or Book not found");
  }

  const reviewDetails = {
    userID,
    firstName: user.firstName,
    lastName: user.lastName,
    review,
    rate,
  };

  const reviewed = book.reviews.push(reviewDetails);

  await Book.findOneAndUpdate({ _id: bookID }, { reviews: reviewed });

  return "Success";
};

module.exports = {
  getAllBooks,
  addNewBook,
  queryBooks,
  removeBook,
  updateBook,
  borrowBook,
  returnBook,
  getAllBorrows,
  getHistories,
  bookReview,
};
