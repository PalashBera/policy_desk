require('dotenv').config();

import jwt from 'jsonwebtoken';

export default {
  issue(payload) {
    const expiresIn = process.env.JWT_EXPIRES_IN;

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn
    });
  }
};
