global.env = process.env.NODE_ENV || "development";
const config = require("./config/environments/" + global.env);

import express from "express";
import logger from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Policy Desk application." });
});

app.listen(config.port, () => {
  console.log(`Server is running at PORT http://localhost:${config.port}`);
});
