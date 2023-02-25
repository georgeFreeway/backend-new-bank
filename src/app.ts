import express, { Request } from "express";
import config from "config";
import cors from "cors";
import dataBase from "./database/database.config";
import router from "./routes";
import deserializeUser from "./middlewares/deserialiseUser";

const app = express();
app.use(cors<Request>());
app.use(express.json());
const port = config.get<number>("port");

app.set("view engine", "ejs");
app.use(deserializeUser);
app.use(express.urlencoded({ extended: false }));

dataBase
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log("connected to database and listening for requests");
    });
  })
  .catch((error) => {
    console.log(error, "aww snap! could not connect");
  });

dataBase
  .sync({ alter: true })
  .then(() => {
    console.log("table create successfully");
  })
  .catch((error) => {
    console.log(error, "could not create table");
  });

app.use("/api/new-bank", router);
