import express from "express";
import { APP_PORT } from "./config";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandlers";
import mongoose from "mongoose";

const app = express();

/* database connection */
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("DB connected...");
});

app.use(express.json());

app.use("/api", routes); //register routes  eg:  /register

app.use(errorHandler); // register middleware

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
