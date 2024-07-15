const request = require("supertest");
const { faker } = require("@faker-js/faker");
const User = require("../user/user.model");
const app = require("../../app");
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




describe("Auth Routes", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  describe("POST /library/user/register", () => {
    let adminUser;
    beforeEach(() => {
      adminUser = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "Admin",
      };
    });

    test("should return 201 and successfully register user if request data is ok", async () => {
      const res = await request(app)
        .post("/api/v1/library/user")
        .send(adminUser);

      expect(res.statusCode).toBe(CREATED);

      expect(res.body.user).not.toHaveProperty("password");
      expect(res.body.user).toEqual({
        _id: expect.anything(),
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email,
        role: "Admin",
      });

      const dbUser = await User.findById(res.body.user._id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(adminUser.password);
      expect(dbUser).toMatchObject({
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email,
        role: "Admin",
      });
    });
  });

  describe("POST /library/user/login", () => {
    let user;
    beforeEach(() => {
      user = {
        email: adminUser.email,
        password: adminUser.password,
      };
    });
    test("Should return 202 Accepted if successful login", async () => {
      const res = await request(app)
        .post("/library/user/login")
        .send(user)
        .expect(ACCEPTED);
    });
  });
});
