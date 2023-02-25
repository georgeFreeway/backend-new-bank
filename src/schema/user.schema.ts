import { number, object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    firstName: string({
      required_error: "firstname is required",
    }),
    lastName: string({
      required_error: "lasttname is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("A valid Email Address is required"),
    password: string({
      required_error: "Password is required",
    }).min(8, "atleast 8 length"),
    confirmPassword: string({
      required_error: "Confirm your password",
    }).min(8, "atleast 8 length"),
    phone: number({
      required_error: "Phone number is required",
    }).min(10, "atleast 10 numbers"),
    dateOfBirth: string({
      required_error: "date of birth is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  }),
});

export const verifyUserSchema = object({
  params: object({
    uniqueId: string(),
  }),
  body: object({
    verificationCode: number({
      required_error: "Provide the code sent to your Email Address",
    }),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Input your registered Email Address",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Please enter your registered email address",
    }).email("Must be a valid email"),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    uniqueId: string(),
    token: string(),
  }),
});

export const resetPasswordPostSchema = object({
  params: object({
    uniqueId: string(),
    token: string(),
  }),
  body: object({
    password: string({
      required_error: "Change your password",
    }).min(8, "atleast 8 characters"),
    confirmPassword: string({
      required_error: "Confirm Password",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>["params"];
export type ResetPasswordInputPost = TypeOf<typeof resetPasswordPostSchema>;
