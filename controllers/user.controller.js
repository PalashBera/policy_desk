import { validationResult } from "express-validator";
import { errorFormatter } from "../helpers/error.helper";
import userService from "../services/user.service";

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
  },

  async login(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await db.users.findOne({ where: { email: req.body.email } });
      const authenticated = userService.comparePassword(req.body.password, user.password);

      if (!authenticated) {
        const error = {
          location: "body",
          message: "You have entered wrong password.",
          param: "password",
          value: req.body.password
        }

        return res.status(422).json({ errors: [error] });
      }

      return res.status(200).json(user); // send jwt token
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  }
};
