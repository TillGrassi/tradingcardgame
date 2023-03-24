"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cards = void 0;
const db_1 = __importDefault(require("../db"));
class Cards {
    async booster(pack) {
        try {
            const { one, two, three, four, five } = pack;
            const sql = "SELECT * FROM cards WHERE id IN ($1, $2, $3, $4, $5)";
            // @ts-ignore
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [one, two, three, four, five]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            // @ts-ignore
            throw new Error(`Could not find cards. Error: ${err.stack}`);
        }
    }
}
exports.Cards = Cards;
