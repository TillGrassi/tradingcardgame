import express, { Request, Response } from "express";
import { Cards } from "../models/cards";
import verifyToken from "../middleware/token";
import boosterpack from "../middleware/booster";

const store = new Cards();

const booster = async (req: Request, res: Response) => {
  try {
    const pack = boosterpack();
    const cards = await store.booster(pack);
    res.json(cards);
  } catch (err) {
    throw new Error(`Could not open booster: ${err}`);
  }
};

const card_routes = (app: express.Application) => {
  app.get("/booster", verifyToken, booster);
};

export default card_routes;
