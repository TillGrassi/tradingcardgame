"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_cards_1 = require("../models/user_cards");
const token_1 = __importDefault(require("../middleware/token"));
const store = new user_cards_1.User_Cards();
const collection = async (req, res) => {
    try {
        const username = req.params.username;
        const cards = await store.collection(username);
        res.json(cards);
    }
    catch (err) {
        throw new Error(`Could not get collection of user ${req.params.username}: ${err}`);
    }
};
const addCards = async (req, res) => {
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
    }
    catch (err) {
        throw new Error(`Could not add cards to collection of user ${req.params.username}: ${err}`);
    }
};
const user_cards_routes = (app) => {
    app.get("/collection", token_1.default, collection);
    app.post("/addCards", token_1.default, addCards);
};
exports.default = user_cards_routes;
