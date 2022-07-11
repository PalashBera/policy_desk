import { validationResult } from 'express-validator';
import { errorFormatter, notFoundError } from '../helpers/error.helper';
import responder from '../helpers/responder.helper';
import database from '../models';

export default {
  async index(req, res) {
    try {
      const policies = await database.policies.findAll({ where: { user_id: req.user.id } });
      return responder.success(req, res, policies, { message: 'Policies have been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async show(req, res) {
    try {
      const policy = await database.policies.findOne({ where: { id: req.params.id, user_id: req.user.id } });
      if (!policy) { return responder.notFound(res, { errors: [notFoundError('Policy', req.params.id)] }) };
      return responder.success(req, res, policy, { message: 'Policy has been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async create(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };

      const policy = await database.policies.create({
        policyNumber: req.body.policyNumber,
        commencementDate: req.body.commencementDate,
        policyHolder: req.body.policyHolder,
        premiumAmount: req.body.premiumAmount,
        policyMode: req.body.policyMode,
        policyType: req.body.policyType,
        phoneNumber: req.body.phoneNumber,
        userId: req.user.id
      });

      return responder.success(req, res, policy, { message: 'Policy has been successfully created.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async update(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };
      const policy = await database.policies.findOne({ where: { id: req.params.id, user_id: req.user.id } });
      if (!policy) { return responder.notFound(res, { errors: [notFoundError('Policy', req.params.id)] }) };

      policy.update({
        policyNumber: req.body.policyNumber,
        commencementDate: req.body.commencementDate,
        policyHolder: req.body.policyHolder,
        premiumAmount: req.body.premiumAmount,
        policyMode: req.body.policyMode,
        policyType: req.body.policyType,
        phoneNumber: req.body.phoneNumber,
        surrendered: req.body.surrendered
      });

      return responder.success(req, res, policy, { message: 'Policy has been successfully updated.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async destroy(req, res) {
    try {
      const policy = await database.policies.findOne({ where: { id: req.params.id, user_id: req.user.id } });
      if (!policy) { return responder.notFound(res, { errors: [notFoundError('Policy', req.params.id)] }) };
      policy.destroy();
      return responder.success(req, res, policy, { message: 'Policy has been successfully deleted.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  }
};
