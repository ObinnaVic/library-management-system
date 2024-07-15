const JOI = require("joi");
const validate = require("./custom.validation.js");

const createBook = {
  body: JOI.object().keys({
    title: JOI.string().required(),
    author: JOI.string().required(),
    ISBN: JOI.string().required(),
    genre: JOI.string().required(),
    bookCount: JOI.number().required(),
    publicationDate: JOI.string(),
  }),
};

const queryBooks = {
  query: JOI.object()
    .keys({
      title: JOI.string(),
      author: JOI.string(),
      genre: JOI.string(),
      rating: JOI.number(),
      availability: JOI.boolean(),
    })
    .min(1),
};

const getBook = {
  params: JOI.object().keys({
    bookID: JOI.string().required().custom(validate.objectId),
  }),
};

const updateBook = {
  params: JOI.object().keys({
    bookID: JOI.string().required().custom(validate.objectId),
  }),
  body: JOI.object()
    .keys({
      title: JOI.string(),
      author: JOI.string(),
      ISBN: JOI.string(),
      genre: JOI.string(),
      bookCount: JOI.number(),
      publicationDate: JOI.string(),
    })
    .min(1),
};

const deleteBook = {
  params: JOI.object().keys({
    bookID: JOI.string().custom(validate.objectId),
  }),
};

const borrowBook = {
  params: JOI.object().keys({
    bookID: JOI.string().required().custom(validate.objectId),
  }),
  body: JOI.object().keys({
    startDate: JOI.string().required(),
  }),
};

const returnBook = {
  params: JOI.object().keys({
    bookID: JOI.string().required().custom(validate.objectId),
  }),
  body: JOI.object().keys({
    endDate: JOI.string().required(),
  }),
};

const reviewBook = {
  params: JOI.object().keys({
    bookID: JOI.string().required().custom(validate.objectId),
  }),
  body: JOI.object().keys({
    rate: JOI.number().required(),
    review: JOI.string().required(),
  }),
};

module.exports = {
  createBook,
  queryBooks,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  reviewBook
}
