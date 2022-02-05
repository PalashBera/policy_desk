require("dotenv").config();
global.env = process.env.NODE_ENV || "development";
const config = require("./config/" + global.env);
const db = require("./models");

import express from "express";
import logger from "morgan";
import cors from "cors";
import { rootRouter } from "./routes/index.router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.authenticate().then(() => {
  console.log("DB connection has been established successfully.");
}).catch(err => {
  console.error("Unable to connect to the database:", err);
});

app.use(logger("dev"));

app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Policy Desk application." });
});

app.listen(config.port, () => {
  console.log(`Server is running at PORT http://localhost:${config.port}`);
});
