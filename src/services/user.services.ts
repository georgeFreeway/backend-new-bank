import { UserModel } from "../models/user.model";
import * as argon from "argon2";
import { signJwt } from "../utils/jwt";
import { UserType } from "../custom-types/types";
import { privateField, User } from "../models/user.model";
import { omit } from "lodash";

export const registerUsers = async (user: UserType) => {
  const hash = await argon.hash(user.password);
  user.password = hash;
  return UserModel.create(user);
};

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ where: { email } });
};

export const findUserByUniqueId = async (uniqueId: string) => {
  return UserModel.findOne({ where: { userUniqueId: uniqueId } });
};

export const signAccessToken = async (user: User) => {
  const payload = omit(user.toJSON(), privateField);

  return signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "5m",
  });
};
