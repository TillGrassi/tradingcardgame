import client from "../database";

export class User_Cards {
  async collection(username) {
    try {
      const sql = "SELECT * FROM user_cards WHERE username=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [username]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get collection of ${username}. Error: ${err}`);
    }
  }

  async addCards(pack) {
    try {
      const { username, card1, card2, card3, card4, card5 } = pack;
      const sql =
        "INSERT INTO user_cards (username, card) VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5), ($1, $6) RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [
        username,
        card1,
        card2,
        card3,
        card4,
        card5,
      ]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not add cards to collection of ${username}. Error: ${err}`
      );
    }
  }
}
