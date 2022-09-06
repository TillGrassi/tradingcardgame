import createError from "http-errors";
import express, { Request, Response} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import user_routes from "./handlers/user";
import card_routes from "./handlers/cards";
import user_cards_routes from "./handlers/user_cards";

const app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: () => void) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

user_routes(app);
card_routes(app);
user_cards_routes(app);

export default app;
