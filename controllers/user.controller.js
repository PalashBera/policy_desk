import { validationResult } from "express-validator";
import { errorFormatter } from "../helpers/error.helper";
import userService from '../services/user.service';

const db = require("../models");

export default {
  async signup(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const encryptedPass = userService.encryptPassword(req.body.password);

      const user = await db.users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptedPass
      });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};
