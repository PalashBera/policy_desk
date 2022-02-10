import { check } from 'express-validator';
import database from '../models';

module.exports = {
  validateCreate: [
    check('policyName')
      .exists().withMessage('Policy name should be present.').bail()
      .isString().withMessage('Policy name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy name can\'t be blank.'),

    check('policyNumber')
      .exists().withMessage('Policy number should be present.').bail()
      .isString().withMessage('Policy number should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy number can\'t be blank.'),

    check('policyHolderName')
      .exists().withMessage('Policy holder name should be present.').bail()
      .isString().withMessage('Policy holder name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy holder name can\'t be blank.'),

    check('tenure')
      .exists().withMessage('Tenure should be present.').bail()
      .isInt().withMessage('Tenure should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Tenure can\'t be blank.'),

    check('mode')
      .exists().withMessage('Mode should be present.').bail()
      .isString().withMessage('Mode should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Mode can\'t be blank.').bail()
      .isIn(['monthly', 'quarterly', 'half-yearly', 'yearly']).withMessage('Mode does contain invalid value.'),

    check('premium')
      .exists().withMessage('Premium should be present.').bail()
      .isInt().withMessage('Premium should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Premium can\'t be blank.'),

    check('commencementDate')
      .exists().withMessage('Commencement date should be present.').bail()
      .isDate().withMessage('Commencement date should be date.').bail()
      .trim().isLength({ min: 1 }).withMessage('Commencement date can\'t be blank.'),

    check('clientId')
      .exists().withMessage('Cliend ID should be present.').bail()
      .isInt().withMessage('Cliend ID should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Cliend ID can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const client = await database.clients.findOne({ where: { id: value, userId: req.user.id } });
        if (!client) return Promise.reject('Client ID is invalid.');
      })
  ],

  validateUpdate: [
    check('policyName')
      .exists().withMessage('Policy name should be present.').bail()
      .isString().withMessage('Policy name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy name can\'t be blank.'),

    check('policyNumber')
      .exists().withMessage('Policy number should be present.').bail()
      .isString().withMessage('Policy number should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy number can\'t be blank.'),

    check('policyHolderName')
      .exists().withMessage('Policy holder name should be present.').bail()
      .isString().withMessage('Policy holder name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy holder name can\'t be blank.'),

    check('tenure')
      .exists().withMessage('Tenure should be present.').bail()
      .isInt().withMessage('Tenure should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Tenure can\'t be blank.'),

    check('mode')
      .exists().withMessage('Mode should be present.').bail()
      .isString().withMessage('Mode should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Mode can\'t be blank.').bail()
      .isIn(['monthly', 'quarterly', 'half-yearly', 'yearly']).withMessage('Mode does contain invalid value.'),

    check('premium')
      .exists().withMessage('Premium should be present.').bail()
      .isInt().withMessage('Premium should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Premium can\'t be blank.'),

    check('commencementDate')
      .exists().withMessage('Commencement date should be present.').bail()
      .isDate().withMessage('Commencement date should be date.').bail()
      .trim().isLength({ min: 1 }).withMessage('Commencement date can\'t be blank.'),

    check('clientId')
      .exists().withMessage('Cliend ID should be present.').bail()
      .isInt().withMessage('Cliend ID should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Cliend ID can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const client = await database.clients.findOne({ where: { id: value, userId: req.user.id } });
        if (!client) return Promise.reject('Client ID is invalid.');
      })
  ]
};
