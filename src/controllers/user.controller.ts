import { Request, Response } from "express";
import * as argon from "argon2";
import {
  ForgotPasswordInput,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
  ResetPasswordInputPost,
  VerifyUserInput,
} from "../schema/user.schema";
import {
  findUserByEmail,
  registerUsers,
  findUserByUniqueId,
  signAccessToken,
} from "../services/user.services";
import { verifyJwt } from "../utils/jwt";
import { UserModel } from "../models/user.model";

export const registerUserController = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const user = req.body;

  try {
    const emailExists = await findUserByEmail(user.email);
    if (emailExists) {
      return res.status(400).send("Email Already Registered!");
    }
    await registerUsers(user);
    res.status(200).send("Registration successful");
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
};

export const verifyUserController = async (
  req: Request<VerifyUserInput["params"], {}, VerifyUserInput["body"]>,
  res: Response
) => {
  const uniqueId = req.params.uniqueId;
  const verificationCode = req.body.verificationCode;

  const user = await findUserByUniqueId(uniqueId);
  if (!user) {
    return res.status(404).send("No user found!");
  }

  if (user.verified) {
    return res.status(200).send("User is already verified");
  }

  if (user && !user.verified && verificationCode) {
    user.verified = true;
    await user.save();
    return res.status(200).send("Verification Successful");
  }
};

export const loginUserController = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).send("No user found!");
  }

  const validatePassword = await argon.verify(user.password, password);
  if (!validatePassword) {
    return res.status(404).send("Incorrect password!");
  }

  const accessToken = await signAccessToken(user);

  return res.status(200).send(accessToken);
};

export const forgotPasswordController = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) => {
  const email = req.body.email;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).send("No such user found!");
    }

    const token = await signAccessToken(user);
    const link = `http://localhost:8000/api/new-bank/users/reset-password/${user.userUniqueId}/${token}`;
    console.log(link);
    //sendmail
    return res.status(200).json({
      message: "A password reset link has been sent to your Email Address",
    });
  } catch (error) {
    res.status(404).send("An error occurred");
    console.log(error);
  }
};

export async function resetPasswordController(
  req: Request<ResetPasswordInput, {}, {}>,
  res: Response
) {
  const { uniqueId, token } = req.params;

  try {
    const user = await findUserByUniqueId(uniqueId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No such user exists in our system" });
    }

    const decodeToken = verifyJwt(token, "accessTokenPublicKey");
    res.render("index", { email: user.email });
  } catch (error) {
    return res.status(404).json({ message: "Not verified" });
  }
}

export async function resetPassword(
  req: Request<
    ResetPasswordInputPost["params"],
    {},
    ResetPasswordInputPost["body"]
  >,
  res: Response
) {
  const { uniqueId, token } = req.params;
  const { password } = req.body;

  try {
    const user = await findUserByUniqueId(uniqueId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No such user exists in our system" });
    }

    const decodeToken = verifyJwt(token, "accessTokenPublicKey");
    const hashed = await argon.hash(password);
    await UserModel.update(
      { password: hashed },
      { where: { userUniqueId: uniqueId } }
    );
    return res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Something went wrong" });
  }
}
// "firstName": "george",
// "lastName": "okafo",
// "email": "georgeokafo1@gmail.com",
// "password": "testing123",
// "confirmPassword": "testing123",
// "phone": 8165916785,
// "dateOfBirth": "04/10/1996"
