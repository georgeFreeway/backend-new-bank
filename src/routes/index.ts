import express from "express";
import userRouter from "./user.routes";

const router = express.Router();

router.get("/healthCheck", (_, res) => res.send("OK"));
router.use(userRouter);

export default router;
