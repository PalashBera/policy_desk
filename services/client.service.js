import { check } from 'express-validator';

module.exports = {
  validateCreate: [
    check('firstName')
      .exists().withMessage('First name should be present.').bail()
      .isString().withMessage('First name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('First name can\'t be blank.'),

    check('lastName')
      .exists().withMessage('Last name should be present.').bail()
      .isString().withMessage('Last name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Last name can\'t be blank.'),

    check('phoneNumber')
      .exists().withMessage('Phone number should be present.').bail()
      .isString().withMessage('Phone number should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Phone number can\'t be blank.')
  ],

  validateUpdate: [
    check('firstName')
      .exists().withMessage('First name should be present.').bail()
      .isString().withMessage('First name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('First name can\'t be blank.'),

    check('lastName')
      .exists().withMessage('Last name should be present.').bail()
      .isString().withMessage('Last name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Last name can\'t be blank.'),

    check('phoneNumber')
      .exists().withMessage('Phone number should be present.').bail()
      .isString().withMessage('Phone number should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Phone number can\'t be blank.')
  ]
};
