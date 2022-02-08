import express from "express";
import { userRouter } from "./user.router";
import { clientRouter } from "./client.router";
import { policyRouter } from "./policy.router";

export const rootRouter = express.Router();
rootRouter.use("/users", userRouter);
rootRouter.use("/clients", clientRouter);
rootRouter.use("/policies", policyRouter);
