require('dotenv').config();

import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/error.helper';
import { generateToken, sendToken } from '../helpers/verifyToken.helper';
import jwt from '../helpers/jwt.helper';
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
        password: encryptedPass,
        token: generateToken(),
        confirmationToken: userService.encryptPassword(Date.now().toString()),
        confirmationTokenSentAt: Date.now()
      });

      sendToken(user.email, user.token);
      return responder.success(req, res, user, { message: 'Welcome! You have successfully signed up. You\'ll receive one email containing OTP to confirm your account.' });
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

      if (user.confirmedAt) {
        const token = jwt.issue({ id: user.id }, '7d');
        return responder.success(req, res, user, { message: 'Welcome! You have successfully signed in.', jwtToken: token });
      } else {
        user.update({
          token: generateToken(),
          confirmationToken: userService.encryptPassword(Date.now().toString()),
          confirmationTokenSentAt: Date.now()
        });

        sendToken(user.email, user.token);
        return responder.success(req, res, user, { message: 'Your account is not confirmed yet. You\'ll receive one email containing OTP to confirm your account.' });
      }
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async confirm(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };
      const user = await database.users.findOne({ where: { email: req.body.email } });

      if (user.confirmationToken !== req.body.confirmationToken) {
        const error = {
          location: 'body',
          message: 'Confirmation token isn\'t valid.',
          param: 'confirmationToken',
          value: req.body.confirmationToken
        }

        return responder.unprocessableEntity(res, { errors: [error] });
      }

      if (user.token !== req.body.token) {
        const error = {
          location: 'body',
          message: 'Token isn\'t valid.',
          param: 'token',
          value: req.body.token
        }

        return responder.unprocessableEntity(res, { errors: [error] });
      }

      if (user.confirmationTokenSentAt.getTime() < new Date(Date.now() - parseInt(process.env.CONFIRMATION_TOKEN_VALIDITY)).getTime()) {
        const error = {
          location: 'body',
          message: 'Confirmation token is expired.',
          param: 'confirmationToken',
          value: req.body.confirmationToken
        }

        return responder.unprocessableEntity(res, { errors: [error] });
      }

      user.update({ confirmedAt: Date.now(), token: null, confirmationToken: null, confirmationTokenSentAt: null });
      const token = jwt.issue({ id: user.id }, '7d');
      return responder.success(req, res, user, { message: 'You have successfully confirmed your account.', jwtToken: token });
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
