"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cards = void 0;
const database_1 = __importDefault(require("../database"));
class Cards {
    async booster(pack) {
        try {
            const { one, two, three, four, five } = pack;
            const sql = "SELECT * FROM cards WHERE id=($1, $2, $3, $4, $5)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [one, two, three, four, five]);
            conn.end();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find cards. Error: ${err}`);
        }
    }
}
exports.Cards = Cards;
