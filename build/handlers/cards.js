"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cards_1 = require("../models/cards");
const token_1 = __importDefault(require("../middleware/token"));
const booster_1 = __importDefault(require("../middleware/booster"));
const store = new cards_1.Cards();
const booster = async (req, res) => {
    try {
        const pack = (0, booster_1.default)();
        const cards = await store.booster(pack);
        res.json(cards);
    }
    catch (err) {
        throw new Error(`Could not open booster: ${err}`);
    }
};
const card_routes = (app) => {
    app.get("/booster", token_1.default, booster);
};
exports.default = card_routes;
