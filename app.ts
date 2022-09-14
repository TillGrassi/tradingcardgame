import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routes from "./handlers/user";
import card_routes from "./handlers/cards";
import user_cards_routes from "./handlers/user_cards";

const app: express.Application = express()
const address: string = "0.0.0.0:4000"

app.use(bodyParser.json())

app.listen(4000, function () {
    console.log(`starting app on: ${address}`)
})

card_routes(app);
user_routes(app);
user_cards_routes(app);

export default app