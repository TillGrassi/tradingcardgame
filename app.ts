import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routes from "./handlers/user";
import card_routes from "./handlers/cards";
import user_cards_routes from "./handlers/user_cards";
import path from 'path';

const app: express.Application = express()
const address: string = "0.0.0.0:8080"

app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

if (process.env.NODE_ENV !== 'test') {
    app.listen(8080, () => console.log(`Listening on port ${address}`))
  }

/*const server = app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
process.on('SIGINT', () => {
    console.log("SIGINT signal received.");
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});*/


card_routes(app);
user_routes(app);
user_cards_routes(app);

export default app