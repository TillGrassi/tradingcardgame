import client from "../db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export type User = {
  id?: number,
  username: string,
  password: string
}

export type exportUser = {
  id: number,
  username: string,
  boosterpacks: number | null,
  coins: number | null,
  token: string
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

  async create(u: User): Promise<User | boolean> {
    try {
      const sql =
        "INSERT INTO users (username, password, coins, boosterpacks) VALUES($1, $2, 0, 5) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [u.username, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      console.log(new Error(`Could not add new user ${u.username}. Error: ${err}`));
      return false;
    }
  }

  async authenticate(user: User, token: string): Promise<exportUser | boolean> {
    // @ts-ignore
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE username=($1)";

    const result = await conn.query(sql, [user.username]);

    if (result.rows.length) {
      const control = result.rows[0];
      const response = {
        id: control.id,
        username: control.username,
        boosterpacks: control.boosterpacks,
        coins: control.coins,
        token
      }

      if (bcrypt.compareSync(user.password + pepper, control.password)) {
        const sql = "SELECT last_login FROM users WHERE username = ($1)";
        const result = await conn.query(sql, [user.username]);
        const lastLogin = result.rows[0].last_login;
        const now = new Date();

        if (!lastLogin || now.getTime() - lastLogin.getTime() >= 12 * 60 * 60 * 1000) {
          console.log("lastLogin fired")
          // User hasn't logged in before, or last login was more than 12 hours ago
          const sql = "UPDATE users SET boosterpacks = boosterpacks + 3 WHERE username = ($1)";
          await conn.query(sql, [user.username]);
          // Update last login time
          const updateSql = "UPDATE users SET last_login = NOW() WHERE username = ($1)";
          await conn.query(updateSql, [user.username]);
        }
        conn.release();
        return response;
      }
    }
    conn.release();
    return false;
  }

  async removeBooster(username: string): Promise<boolean> {
    try {
      const sql = "UPDATE users SET boosterpacks = boosterpacks - 1 WHERE username = ($1)";
      // @ts-ignore
      const conn = await client.connect();

      await conn.query(sql, [username]);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not reduce boosterpacks for user ${username}. Error: ${err}`);
    }
  }

  async addBooster(username: string): Promise<boolean> {
    try {
      const sql = "UPDATE users SET boosterpacks = boosterpacks + 1 WHERE username = ($1)";
      // @ts-ignore
      const conn = await client.connect();

      await conn.query(sql, [username]);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not reduce boosterpacks for user ${username}. Error: ${err}`);
    }
  }

  async removeCoin(username: string): Promise<boolean> {
    try {
      const sql = "UPDATE users SET coins = coins - 10 WHERE username = ($1)";
      // @ts-ignore
      const conn = await client.connect();

      await conn.query(sql, [username]);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not reduce boosterpacks for user ${username}. Error: ${err}`);
    }
  }

  async addCoin(amount: number, username: string): Promise<boolean> {
    try {
      const sql = "UPDATE users SET coins = coins + ($1) WHERE username = ($2)";
      // @ts-ignore
      const conn = await client.connect();

      await conn.query(sql, [amount, username]);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not reduce boosterpacks for user ${username}. Error: ${err}`);
    }
  }

}
