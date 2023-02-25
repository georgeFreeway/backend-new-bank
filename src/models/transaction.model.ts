import { Model, DataTypes } from "sequelize";
import { TransactionDetailsType } from "../custom-types/types";
import dataBase from "../database/database.config";

export class TransactionDetails extends Model<TransactionDetailsType> {
  declare id: number;
  declare transactionType: string;
  declare amount: number;
  declare transactionId: string;
  declare senderName: string;
  declare receiverName: string;
  declare balanceBefore: number;
  declare balanceAfter: number;
  declare message: string;
  declare uniqueId: string;
}

export const TransactionDetailsModel = dataBase.define<TransactionDetails>(
  "transactionDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transactionType: {
      type: DataTypes.ENUM("credit", "debit", "loan", "airtime"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balanceBefore: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    balanceAfter: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uniqueId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => Math.floor(Math.random() * 1000),
      unique: true,
    },
  },
  { freezeTableName: true, tableName: "transactionDetails", timestamps: true }
);
