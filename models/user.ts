import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export type User = {
  id?: number,
  username: string,
  password: string
}

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const pepper: string = BCRYPT_PASSWORD as string;
const saltRounds: string = SALT_ROUNDS as string;

export class Users {
  async show(username: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE username=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [username]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${username}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [u.username, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }

  async authenticate(user: User): Promise<User | null> {
    // @ts-ignore
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE username=($1)";

    const result = await conn.query(sql, [user.username]);

    if (result.rows.length) {
      const control = result.rows[0];

      if (bcrypt.compareSync(user.password + pepper, control.password)) {
        conn.release();
        return user;
      }
    }
    conn.release();
    return null;
  }
}
