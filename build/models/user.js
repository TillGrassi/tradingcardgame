"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;
class Users {
    async show(username) {
        try {
            const sql = "SELECT * FROM users WHERE username=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [username]);
            conn.end();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${username}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *";
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [u.username, hash]);
            const user = result.rows[0];
            conn.end();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
        }
    }
    async authenticate(user) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM users WHERE username=($1)";
        const result = await conn.query(sql, [user.username]);
        if (result.rows.length) {
            const control = result.rows[0];
            if (bcrypt_1.default.compareSync(user.password + pepper, control.password)) {
                conn.end();
                return user;
            }
        }
        conn.end();
        return null;
    }
}
exports.Users = Users;
