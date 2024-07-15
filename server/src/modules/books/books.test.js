const request = require("supertest");
const { connectToDatabase, disconnectDatabase } = require("../../db");
const app = require("../../../index");
const { faker } = require("@faker-js/faker");
const User = require("../user/user.model");
const Book = require("../books/books.model");
const {
  CREATED,
  BAD_REQUEST,
  OK,
  UNAUTHORIZED,
  NO_CONTENT,
  NOT_FOUND,
  FORBIDDEN,
  ACCEPTED,
} = require("http-status");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../middlewares/verifyToken");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(verifyToken);

// Library Book flow and functionalities test
describe("Book functionalities Test", () => {
  let newBook;
  beforeAll(async () => {
    await connectToDatabase();
    newBook = {
      title: faker.lorem.words(3), // Generates a title with 3 words
      author: `${faker.person.firstName()} ${faker.person.lastName()}`,
      ISBN: faker.string.uuid(), // Generates a random UUID for ISBN
      genre: "Comedy",
      publishDate: faker.date.past({ years: 2, refDate: "7/24/2022" }), // Generates a random past date within the last 20 years
    };
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  describe("POST: Add book", () => {
    let librarianToken;
    beforeEach(() => {
      librarianToken = jwt.sign({ role: "Librarian" }, "my-test-jwt-secret");
    });
    test("It should return accepted 202 if all details passed in are correct", async () => {
      await request(app)
        .post("/api/v1/library/book/")
        .set("Cookie", `access-token=${librarianToken}`)
        .send(newBook)
        .expect(CREATED);
    });
  });

  describe("Post Borrow book", () => {
    test("It should Borrow a book successfully", async () => {
      await request(app)
        .post("/api/v1/library/book/borrow/6693c6f3c44b62cf5e0336f8")
        .expect(CREATED);
    });
  });
});
