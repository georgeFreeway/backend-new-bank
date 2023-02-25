import { Model, DataTypes } from "sequelize";
import { UserType } from "../custom-types/types";
import dataBase from "../database/database.config";

export class User extends Model<UserType> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare phone: number;
  declare accountNumber: number;
  declare dateOfBirth: string;
  declare verified: boolean;
  declare verificationCode: number;
  declare userUniqueId: string;
}

export const privateField = ["password", "verificationCode"];

export const UserModel = dataBase.define<User>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    accountNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Math.floor(Math.random() * 100000000000),
      unique: true,
    },
    userUniqueId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => Math.floor(Math.random() * 1000),
      unique: true,
    },
    verificationCode: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Math.floor(Math.random() * 1000000),
    },
  },
  { freezeTableName: true, tableName: "users", timestamps: true }
);
