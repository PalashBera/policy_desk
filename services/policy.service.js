import { check } from 'express-validator';
import database from '../models';
import { policyModeOptions } from '../helpers/constant';

module.exports = {
  validateCreate: [
    check('policyNumber')
      .exists().withMessage('Policy number should be present.').bail()
      .isString().withMessage('Policy number should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy number can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const policy = await database.policies.findOne({ where: { policyNumber: value, user_id: req.user.id } });
        if (policy) return Promise.reject('Policy number has already been taken.');
      }),

    check('commencementDate')
      .exists().withMessage('Commencement date should be present.').bail()
      .isDate().withMessage('Commencement date should be date.').bail()
      .trim().isLength({ min: 1 }).withMessage('Commencement date can\'t be blank.'),

    check('policyHolder')
      .exists().withMessage('Policy holder should be present.').bail()
      .isString().withMessage('Policy holder should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy holder can\'t be blank.'),

    check('premiumAmount')
      .exists().withMessage('Premium amount should be present.').bail()
      .isInt().withMessage('Premium amount should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Premium amount can\'t be blank.'),

    check('policyMode')
      .exists().withMessage('Policy mode should be present.').bail()
      .isString().withMessage('Policy mode should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy mode can\'t be blank.').bail()
      .isIn(policyModeOptions).withMessage(`Policy mode should be one of ${policyModeOptions.join(', ')}.`),

    check('policyType')
      .optional()
      .isString().withMessage('Policy type should be string.'),

    check('phoneNumber')
      .optional()
      .isString().withMessage('Phone number should be string.')
  ],

  validateUpdate: [
    check('policyNumber')
      .exists().withMessage('Policy number should be present.').bail()
      .isString().withMessage('Policy number should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy number can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const policy = await database.policies.findOne({ where: { policyNumber: value, user_id: req.user.id } });
        if (policy && policy.id.toString() !== req.params.id) return Promise.reject('Policy number has already been taken.');
      }),

    check('commencementDate')
      .exists().withMessage('Commencement date should be present.').bail()
      .isDate().withMessage('Commencement date should be date.').bail()
      .trim().isLength({ min: 1 }).withMessage('Commencement date can\'t be blank.'),

    check('policyHolder')
      .exists().withMessage('Policy holder should be present.').bail()
      .isString().withMessage('Policy holder should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy holder can\'t be blank.'),

    check('premiumAmount')
      .exists().withMessage('Premium amount should be present.').bail()
      .isInt().withMessage('Premium amount should be integer.').bail()
      .trim().isLength({ min: 1 }).withMessage('Premium amount can\'t be blank.'),

    check('policyMode')
      .exists().withMessage('Policy mode should be present.').bail()
      .isString().withMessage('Policy mode should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Policy mode can\'t be blank.').bail()
      .isIn(policyModeOptions).withMessage(`Policy mode should be one of ${policyModeOptions.join(', ')}.`),

    check('policyType')
      .optional()
      .isString().withMessage('Policy type should be string.'),

    check('phoneNumber')
      .optional()
      .isString().withMessage('Phone number should be string.'),

    check('surrendered')
      .optional()
      .isBoolean().withMessage('Surrendered should be boolean.')
  ]
};
