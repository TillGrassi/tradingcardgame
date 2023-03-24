import express, { Request, Response } from "express";
import { Users } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import verifyToken from "../middleware/token";

dotenv.config();

const store = new Users();

const show = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await store.show(username);
    res.json(user);
  } catch (err) {
    throw new Error(`Could not show user ${req.params.username}: ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const user = {
      username,
      password,
    };
    const newUser = await store.create(user);
    if (newUser) {
      const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);
      res.json(token);
    }
    else {
      res.json(newUser);
    }
  } catch (err) {
    throw new Error(`Could not create user ${req.body.username}}: ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const user = {
      username,
      password,
    };
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as Secret);
    const login = await store.authenticate(user, token);
    res.json(login);
  } catch (err) {
    throw new Error(`Could not authenticate user ${req.body.username}: ${err}`);
  }
};

const removeBooster = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const success = await store.removeBooster(username);
    res.json(success);
  } catch (err) {
    throw new Error(`Could not show user ${req.body.username}: ${err}`);
  }
};

const addBooster = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const success = await store.addBooster(username);
    res.json(success);
  } catch (err) {
    throw new Error(`Could not show user ${req.body.username}: ${err}`);
  }
};

const removeCoin = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const success = await store.removeCoin(username);
    res.json(success);
  } catch (err) {
    throw new Error(`Could not show user ${req.body.username}: ${err}`);
  }
};

const addCoin = async (req: Request, res: Response) => {
  try {
    const amount = req.body.amount;
    const username = req.body.username;
    const success = await store.addCoin(amount, username);
    res.json(success);
  } catch (err) {
    throw new Error(`Could not show user ${req.body.username}: ${err}`);
  }
};

const user_routes = (app: express.Application) => {
  app.get("/users/:username", verifyToken, show);
  app.post("/users", create);
  app.post("/users/login", authenticate);
  app.post("/users/removeBooster", verifyToken, removeBooster);
  app.post("/users/addBooster", verifyToken, addBooster);
  app.post("/users/removeCoin", verifyToken, removeCoin);
  app.post("/users/addCoin", verifyToken, addCoin);
};

export default user_routes;
