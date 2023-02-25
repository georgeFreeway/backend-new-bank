import { Sequelize, Dialect } from "sequelize";
import config from "config";

const databaseName = config.get<string>("databaseName");
const databaseUser = config.get<string>("databaseUser");
const databasePassword = config.get<string>("databasePassword");
const dialect = config.get<Dialect>("dialect");

const dataBase = new Sequelize(databaseName, databaseUser, databasePassword, {
  storage: "./database.mysql",
  dialect,
  logging: false,
});

export default dataBase;
