import express, { Request, Response } from "express";
import { User_Cards, InputPack } from "../models/user_cards";
import verifyToken from "../middleware/token";

const store = new User_Cards();

const collection = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const cards = await store.collection(username);
    res.json(cards);
  } catch (err) {
    throw new Error(
      `Could not get collection of user ${req.params.username}: ${err}`
    );
  }
};

const addCards = async (req: Request, res: Response) => {
  try {
    const pack: InputPack = {
      username: req.body.username,
      card1: req.body.card1,
      card2: req.body.card2,
      card3: req.body.card3,
      card4: req.body.card4,
      card5: req.body.card5,
    };
    const cards = await store.addCards(pack);
    res.json(cards);
  } catch (err) {
    throw new Error(
      `Could not add cards to collection of user ${req.params.username}: ${err}`
    );
  }
};

const deleteCard = async (req: Request, res: Response) => {
  try {
    const result = await store.deleteCard(req.body.username, req.body.card);
    res.json(result);
  } catch (err) {
    throw new Error(
      `Could not delete card from collection of user ${req.body.username}: ${err}`
    );
  }
}

const user_cards_routes = (app: express.Application) => {
  app.get("/collection:username", verifyToken, collection);
  app.post("/addCards", verifyToken, addCards);
  app.post("/deleteCard", verifyToken, deleteCard);
};

export default user_cards_routes;
