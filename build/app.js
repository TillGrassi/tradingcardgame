"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./handlers/user"));
const cards_1 = __importDefault(require("./handlers/cards"));
const user_cards_1 = __importDefault(require("./handlers/user_cards"));
const app = (0, express_1.default)();
const address = "0.0.0.0:8080";
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(8080, () => console.log(`Listening on port ${address}`));
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
(0, cards_1.default)(app);
(0, user_1.default)(app);
(0, user_cards_1.default)(app);
exports.default = app;
