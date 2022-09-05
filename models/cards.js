import client from "../database";

export class Cards {
  async booster(pack) {
    try {
      const { one, two, three, four, five } = pack;
      const sql = "SELECT * FROM cards WHERE id=($1, $2, $3, $4, $5)";

      const conn = await client.connect();

      const result = await conn.query(sql, [one, two, three, four, five]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find cards. Error: ${err}`);
    }
  }
}
