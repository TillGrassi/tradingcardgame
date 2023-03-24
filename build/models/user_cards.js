"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Cards = void 0;
const db_1 = __importDefault(require("../db"));
class User_Cards {
    async collection(username) {
        try {
            const sql = "SELECT * FROM cards INNER JOIN user_cards ON cards.id = user_cards.card WHERE username=($1)";
            // @ts-ignore
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [username]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get collection of ${username}. Error: ${err}`);
        }
    }
    async addCards(pack) {
        const { username, card1, card2, card3, card4, card5 } = pack;
        try {
            const sql = "INSERT INTO user_cards (username, card) VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5), ($1, $6) RETURNING *";
            // @ts-ignore
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [
                username,
                card1,
                card2,
                card3,
                card4,
                card5,
            ]);
            conn.release();
            return pack;
        }
        catch (err) {
            throw new Error(`Could not add cards to collection of ${username}. Error: ${err}`);
        }
    }
}
exports.User_Cards = User_Cards;
