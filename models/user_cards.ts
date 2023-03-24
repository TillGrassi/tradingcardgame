import client from "../db";

type CardObject = {
  id: number,
  name: string,
  image: string,
  description: string | null,
  effect: string | null,
  rarity: string
}

export type InputPack = {
  username: string,
  card1: CardObject,
  card2: CardObject,
  card3: CardObject,
  card4: CardObject,
  card5: CardObject
}

export type OutputPack = {
  card1: CardObject,
  card2: CardObject,
  card3: CardObject,
  card4: CardObject,
  card5: CardObject
}

export class User_Cards {
  async collection(username: string): Promise<any[]> {
    try {
      const formattedUsername = username.slice(1);
      const sql = "SELECT cards.* FROM cards INNER JOIN user_cards ON cards.id = user_cards.card WHERE username= ($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [formattedUsername]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get collection of ${username}. Error: ${err}`);
    }
  }

  async addCards(pack: InputPack): Promise<any> {
    const { username, card1, card2, card3, card4, card5 } = pack;
    try {
      const sql =
        "INSERT INTO user_cards (username, card) VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5), ($1, $6) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [
        username,
        card1.id,
        card2.id,
        card3.id,
        card4.id,
        card5.id,
      ]);


      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not add cards to collection of ${username}. Error: ${err}`
      );
    }
  }

  async deleteCard(username: string, card: number): Promise<boolean> {
    try {
      const sql = "DELETE FROM user_cards WHERE id IN ( SELECT id FROM user_cards WHERE username = ($1) AND card = ($2) LIMIT 1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [username, card]);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not get collection of ${username}. Error: ${err}`);
    }
  }
}
