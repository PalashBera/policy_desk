import { validationResult } from "express-validator";
import { errorFormatter } from "../helpers/error.helper";

export default {
  async signup(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      return res.json(req.body);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};
