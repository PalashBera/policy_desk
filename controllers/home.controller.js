import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import { errorFormatter } from '../helpers/error.helper';
import responder from '../helpers/responder.helper';
import database from '../models';

export default {
  async index(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };
      const policies = await database.policies.findAll({ where: { user_id: req.user.id, payable_months: { [Op.contains]: [req.body.month] } } });
      return responder.success(req, res, policies, { message: 'Policies have been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  }
}
