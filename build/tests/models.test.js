"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const testUser = {
    username: "testuser",
    password: "password123",
};
//Users
describe("test users model methods", () => {
    const store = new user_1.Users();
    describe("test create/authenticate method", () => {
        it("creates and authenticates a new user", async () => {
            await store.create(testUser);
            const login = await store.authenticate(testUser);
            expect(login?.username).toEqual("testuser");
        });
    });
    describe("test show method", () => {
        it("fetches user", async () => {
            const user = await store.show("testuser");
            expect(user).toBeDefined();
        });
    });
});
