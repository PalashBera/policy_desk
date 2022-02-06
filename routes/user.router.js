import express from "express";
import userController from "../controllers/user.controller";
import userService from "../services/user.service";

export const userRouter = express.Router();

userRouter.post("/signup", userService.validateSignUp, userController.signup);
userRouter.post("/login", userService.validateLogIn, userController.login);
