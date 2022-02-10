import { check } from 'express-validator';
import bcrypt from 'bcryptjs';
import database from '../models';

module.exports = {
  validateSignUp: [
    check('firstName')
      .exists().withMessage('First name should be present.').bail()
      .isString().withMessage('First name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('First name can\'t be blank.'),

    check('lastName')
      .exists().withMessage('Last name should be present.').bail()
      .isString().withMessage('Last name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Last name can\'t be blank.'),

    check('email')
      .exists().withMessage('Email should be present.').bail()
      .isString().withMessage('Email should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Email can\'t be blank.').bail()
      .isEmail().withMessage('Email isn\'t valid.').bail()
      .normalizeEmail()
      .custom(async value => {
        const user = await database.users.findOne({ where: { email: value } });
        if (user) return Promise.reject('Email has already been taken.');
      }),

    check('password')
      .exists().withMessage('Password should be present.').bail()
      .isString().withMessage('Password should be string.').bail()
      .trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),

    check('passwordConfirmation')
      .exists().withMessage('Password confirmation should be present.').bail()
      .isString().withMessage('Password confirmation should be string.').bail()
      .trim().isLength({ min: 6 }).withMessage('Password confirmation must be at least 6 characters.').bail()
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.password) {
          return false;
        } else {
          return value;
        }
      }).withMessage('Password confirmation doesn\'t match with password.')
  ],

  validateSignIn: [
    check('email')
      .exists().withMessage('Email should be present.').bail()
      .isString().withMessage('Email should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Email can\'t be blank.').bail()
      .isEmail().withMessage('Email isn\'t valid.').bail()
      .normalizeEmail()
      .custom(async value => {
        const user = await database.users.findOne({ where: { email: value } });
        if (!user) return Promise.reject('User not found with this email.');
      }),

    check('password')
      .exists().withMessage('Password should be present.').bail()
      .isString().withMessage('Password should be string.').bail()
      .trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
  ],

  encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },

  comparePassword(password, encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
  }
};
