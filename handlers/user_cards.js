import { User_Cards } from "../models/user_cards";
import verifyToken from "../middleware/token";

const store = new User_Cards();

const collection = async (res, req) => {
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

const addCards = async (res, req) => {
  try {
    const pack = {
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

const user_cards_routes = (app) => {
  app.get("/collection", verifyToken, collection);
  app.post("/addCards", verifyToken, addCards);
};

export default user_cards_routes;
