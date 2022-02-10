import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/error.helper';
import jwt from "../helpers/jwt.helper";
import responder from '../helpers/responder.helper';
import userService from '../services/user.service';
import database from '../models';

export default {
  async signup(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };
      const encryptedPass = userService.encryptPassword(req.body.password);

      const user = await database.users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptedPass
      });

      const token = jwt.issue({ id: user.id });
      return responder.success(req, res, user, { message: "Welcome! You have successfully signed up.", jwtToken: token });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async signin(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };
      const user = await database.users.findOne({ where: { email: req.body.email } });
      const authenticated = userService.comparePassword(req.body.password, user.password);

      if (!authenticated) {
        const error = {
          location: 'body',
          message: 'You have entered invalid password.',
          param: 'password',
          value: req.body.password
        }

        return responder.unprocessableEntity(res, { errors: [error] });
      }

      const token = jwt.issue({ id: user.id });
      return responder.success(req, res, user, { message: "Welcome! You have successfully signed in.", jwtToken: token });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async authenticate(req, res) {
    try {
      return responder.success(req, res, req.user, { message: 'User has been successfully authenticated.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  }
};
