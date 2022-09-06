import client from "../database";

export type InputPack = {
  username: string,
  card1: number,
  card2: number,
  card3: number,
  card4: number,
  card5: number
}

export class User_Cards {
  async collection(username: string): Promise<[]> {
    try {
      const sql = "SELECT * FROM user_cards WHERE username=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [username]);

      conn.end();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get collection of ${username}. Error: ${err}`);
    }
  }

  async addCards(pack: InputPack): Promise<[]> {
    const { username, card1, card2, card3, card4, card5 } = pack;
    try {
      const sql =
        "INSERT INTO user_cards (username, card) VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5), ($1, $6) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [
        username,
        card1,
        card2,
        card3,
        card4,
        card5,
      ]);

      conn.end();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not add cards to collection of ${username}. Error: ${err}`
      );
    }
  }
}
