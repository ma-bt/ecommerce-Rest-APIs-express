import express from "express";
import { APP_PORT } from "./config";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandlers";

const app = express();


/* database connection */
app.use(express.json());


app.use("/api", routes); //register routes  eg:  /register

app.use(errorHandler);// register middleware

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
