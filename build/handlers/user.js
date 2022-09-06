"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = __importDefault(require("../middleware/token"));
dotenv_1.default.config();
const store = new user_1.Users();
const show = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await store.show(username);
        res.json(user);
    }
    catch (err) {
        throw new Error(`Could not show user ${req.params.username}: ${err}`);
    }
};
const create = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = {
            username,
            password,
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        throw new Error(`Could not create user ${req.body.username}}: ${err}`);
    }
};
const authenticate = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = {
            username,
            password,
        };
        const login = await store.authenticate(user);
        res.json(login);
    }
    catch (err) {
        throw new Error(`Could not authenticate user ${req.body.username}: ${err}`);
    }
};
const user_routes = (app) => {
    app.get("/users/:username", token_1.default, show);
    app.post("/users", create);
    app.post("/users/login", token_1.default, authenticate);
};
exports.default = user_routes;
