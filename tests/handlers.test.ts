<<<<<<< HEAD
import app from "../app";
import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

const testUser = {
    username: 'testuser2',
    password: 'password123'
}
const token = jwt.sign({ user: testUser }, process.env.TOKEN_SECRET as Secret);

//Users
describe("users api works", () => {
    describe("POST /users creates a new user",() => {
        it("returns statuscode 200", async () => {
            const result = await request.post('http://localhost:4000/users').send({username: 'testuser2', password: 'password123'})
            expect(result.status).toBe(200);
        })
    })
=======
import app from "../app";
import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

const testUser = {
    username: 'testuser2',
    password: 'password123'
}
const token = jwt.sign({ user: testUser }, process.env.TOKEN_SECRET as Secret);

//Users
describe("users api works", () => {
    describe("POST /users creates a new user",() => {
        it("returns statuscode 200", async () => {
            const result = await request.post('http://localhost:4000/users').send({username: 'testuser2', password: 'password123'})
            expect(result.status).toBe(200);
        })
    })
>>>>>>> 5ea5e1b7fa8de0b7f8e44887713cb93ef04da4fb
})