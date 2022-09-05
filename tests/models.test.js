import { Users } from "../models/user";
import client from "../database";

const testUser = {
  username: "testuser",
  password: "password123",
};

//Users
describe("test users model methods", () => {
  const store = new Users();
  afterAll(() => {
    client.end();
  });

  describe("test create/authenticate method", () => {
    it("creates and authenticates a new user", async () => {
      await store.create(testUser);
      const login = await store.authenticate(testUser);
      expect(login.username).toEqual("testuser");
    });
  });

  describe("test show method", () => {
    it("fetches user", async () => {
      const user = await store.show("testuser");
      expect(user).toBeDefined();
    });
  });
});
