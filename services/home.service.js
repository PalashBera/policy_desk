import { check } from 'express-validator';
import { monthOptions } from '../helpers/constant';

module.exports = {
  validateIndex: [
    check('month')
      .exists().withMessage('Month should be present.').bail()
      .isInt().withMessage('Month should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Month can\'t be blank.').bail()
      .isIn(monthOptions).withMessage(`Month should be one of ${monthOptions.join(', ')}.`)
  ]
};
