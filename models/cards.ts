import client from "../db";

export type Pack = {
  one: number,
  two: number,
  three: number,
  four: number,
  five: number
}

export class Cards {
  async booster(pack: Pack): Promise<Pack[]> {
    try {
      const { one, two, three, four, five } = pack;
      const sql = `SELECT c.*
      FROM cards c
      INNER JOIN (
          VALUES
              ($1::INTEGER),
              ($2::INTEGER),
              ($3::INTEGER),
              ($4::INTEGER),
              ($5::INTEGER)
      ) AS v(id) ON c.id = v.id`;
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [one, two, three, four, five]);

      conn.release();

      return result.rows;
    } catch (err) {
      // @ts-ignore
      throw new Error(`Could not find cards. Error: ${err.stack}`);
    }
  }
}
