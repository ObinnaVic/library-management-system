const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const reviewSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  review: {
    type: String,
    required: true,
  },

  rate: {
    type: Number,
    required: true,
  },
});

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },

  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },

  ISBN: {
    type: String,
    required: [true, "ISBN is required"],
    trim: true,
  },

  genre: {
    type: String,
    required: true,
  },

  publicationDate: {
    type: Date,
  },

  reviews: {
    type: [reviewSchema],
  },

  bookCount: {
    type: Number,
    default: 1,
  },

  availability: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
