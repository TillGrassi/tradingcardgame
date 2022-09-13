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
const address = "0.0.0.0:4000";
app.use(body_parser_1.default.json());
app.listen(4000, function () {
    console.log(`starting app on: ${address}`);
});
(0, cards_1.default)(app);
(0, user_1.default)(app);
(0, user_cards_1.default)(app);
exports.default = app;
