import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;

export class Users {
  async show(username) {
    try {
      const sql = "SELECT * FROM users WHERE username=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [username]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${username}. Error: ${err}`);
    }
  }

  async create(u) {
    try {
      const sql =
        "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const conn = await client.connect();

      const result = await conn.query(sql, [u.username, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }

  async authenticate(user) {
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE username=($1)";

    const result = await conn.query(sql, [user.username]);

    if (result.rows.length) {
      const control = result.rows[0];

      if (bcrypt.compareSync(user.password + pepper, control.password)) {
        return user;
      }
    }
    return null;
  }
}
