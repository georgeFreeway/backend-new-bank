import { Model, DataTypes } from "sequelize";
import { AccountDetailsType } from "../custom-types/types";
import dataBase from "../database/database.config";

export class AccountDetails extends Model<AccountDetailsType> {
  declare id: number;
  declare balance: number;
  declare totalDeposit: number;
  declare totalWithdraw: number;
  declare uniqueId: number;
}

export const AccountDetailsModel = dataBase.define<AccountDetails>(
  "accountDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    totalDeposit: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    totalWithdraw: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    uniqueId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => Math.floor(Math.random() * 1000),
    },
  },
  { freezeTableName: true, tableName: "accountDetails", timestamps: true }
);
