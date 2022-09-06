import client from "../database";

export type Pack = {
  one: number,
  two: number,
  three: number,
  four: number,
  five: number
}

export class Cards {
  async booster(pack: Pack): Promise<[]> {
    try {
      const { one, two, three, four, five } = pack;
      const sql = "SELECT * FROM cards WHERE id=($1, $2, $3, $4, $5)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [one, two, three, four, five]);

      conn.end();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find cards. Error: ${err}`);
    }
  }
}
