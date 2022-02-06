import jwt from "jsonwebtoken";

require("dotenv").config();

export default {
  issue(payload) {
    const expiresIn = process.env.JWT_EXPIRES_IN;

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn
    });
  },
};
