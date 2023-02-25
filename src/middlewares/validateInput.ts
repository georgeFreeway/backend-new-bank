import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateInput = (schema: AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
};
