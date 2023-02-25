import express from "express";
import {
  forgotPasswordController,
  loginUserController,
  registerUserController,
  resetPassword,
  resetPasswordController,
  verifyUserController,
} from "../controllers/user.controller";
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schema/user.schema";
import { validateInput } from "../middlewares/validateInput";
import { resetPasswordPostSchema } from "../schema/user.schema";

const userRouter = express.Router();

userRouter.post(
  "/users/register-user",
  validateInput(registerUserSchema),
  registerUserController
);

userRouter.post(
  "/users/verify-user/:uniqueId",
  validateInput(verifyUserSchema),
  verifyUserController
);

userRouter.post(
  "/users/login-user",
  validateInput(loginUserSchema),
  loginUserController
);

userRouter.post(
  "/users/forgot-password",
  validateInput(forgotPasswordSchema),
  forgotPasswordController
);

userRouter.get(
  "/users/reset-password/:uniqueId/:token",
  validateInput(resetPasswordSchema),
  resetPasswordController
);

userRouter.post(
  "/users/reset-password/:uniqueId/:token",
  validateInput(resetPasswordPostSchema),
  resetPassword
);

export default userRouter;
