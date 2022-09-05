import { Users } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyToken from "../middleware/token";

dotenv.config();

const store = new Users();

const show = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await store.show(username);
    res.json(user);
  } catch (err) {
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
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
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
  } catch (err) {
    throw new Error(`Could not authenticate user ${req.body.username}: ${err}`);
  }
};

const user_routes = (app) => {
  app.get("/users/:username", verifyToken, show);
  app.post("/users", create);
  app.post("/users/login", verifyToken, authenticate);
};

export default user_routes;
