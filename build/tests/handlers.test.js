<<<<<<< HEAD
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const request = (0, supertest_1.default)(app_1.default);
const testUser = {
    username: 'testuser2',
    password: 'password123'
};
const token = jsonwebtoken_1.default.sign({ user: testUser }, process.env.TOKEN_SECRET);
//Users
describe("users api works", () => {
    describe("POST /users creates a new user", () => {
        it("returns statuscode 200", async () => {
            const result = await request.post('http://localhost:4000/users').send({ username: 'testuser2', password: 'password123' });
            expect(result.status).toBe(200);
        });
    });
});
=======
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const request = (0, supertest_1.default)(app_1.default);
const testUser = {
    username: 'testuser2',
    password: 'password123'
};
const token = jsonwebtoken_1.default.sign({ user: testUser }, process.env.TOKEN_SECRET);
//Users
describe("users api works", () => {
    describe("POST /users creates a new user", () => {
        it("returns statuscode 200", async () => {
            const result = await request.post('http://localhost:4000/users').send({ username: 'testuser2', password: 'password123' });
            expect(result.status).toBe(200);
        });
    });
});
>>>>>>> 5ea5e1b7fa8de0b7f8e44887713cb93ef04da4fb
