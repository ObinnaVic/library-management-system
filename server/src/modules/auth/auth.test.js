const request = require("supertest");
const { faker } = require("@faker-js/faker");
const User = require("../user/user.model");
const app = require("../../../index");
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
const { connectToDatabase, disconnectDatabase } = require("../../db");


//Authentication, register, login and logout tests
describe("Auth Routes", () => {
  let adminUser;
  beforeAll(async () => {
    await connectToDatabase();
    adminUser = {
      firstName: faker.person.firstName(), //random name
      lastName: faker.person.lastName(), 
      email: faker.internet.email(), //random email
      password: faker.internet.password(), //random password
      role: "Admin"
    };
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  describe("POST: Register", () => {
    test("should return 201 and successfully register user if request data is ok", async () => {
      const res = await request(app)
        .post("/api/v1/library/user/register")
        .send(adminUser);

      expect(res.statusCode).toBe(CREATED);

      expect(res.body).toEqual({
        _id: expect.anything(),
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email.toLowerCase(),
        role: "Admin",
        borrows: [],
        overdueBooks: [],
        history: [],
        __v: expect.anything(),
      });

      const dbUser = await User.findById(res.body._id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(adminUser.password);
    });
  });

  describe("POST: Login", () => {
    let user;
    let userDetails;
    beforeEach(() => {
      user = {
        email: adminUser.email.toLowerCase(),
        password: adminUser.password,
      };

      userDetails = {
        email: "random wrong email",
        password: "random wrong password",
      };
    });
    test("Should return 202 Accepted if successful login", async () => {
      await request(app)
        .post("/api/v1/library/user/login")
        .send(user)
        .expect(ACCEPTED);
    });

    test("Should return 400, Bad request if user login details is wrong", async () => {
      await request(app)
        .post("/api/v1/library/user/login")
        .send(userDetails)
        .expect(BAD_REQUEST);
    });
  });
  describe("GET: Logout", () => {
    test("It should return 200 OK when user successfully logs out", async () => {
      await request(app).get("/api/v1/library/user/logout").expect(OK);
    });
  });
});


