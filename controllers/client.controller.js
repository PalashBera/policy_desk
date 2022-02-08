import { validationResult } from "express-validator";
import { errorFormatter, notFoundError } from "../helpers/error.helper";
import responder from "../helpers/responder.helper";
import database from "../models";

export default {
  async index(req, res) {
    try {
      const clients = await database.clients.findAll({ where: { user_id: req.user.id } });
      return responder.success(req, res, clients, { message: "Clients have been successfully fetched." });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async show(req, res) {
    try {
      const client = await database.clients.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id
        }
      });

      if (!client) { return responder.notFound(res, { errors: [notFoundError("Client", req.params.id)] }) };
      return responder.success(req, res, client, { message: "Client has been successfully fetched." });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async create(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };

      const client = await database.clients.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        userId: req.user.id
      });

      return responder.success(req, res, client, { message: "Client has been successfully created." });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async update(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };

      const client = await database.clients.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id
        }
      });

      if (!client) { return responder.notFound(res, { errors: [notFoundError("Client", req.params.id)] }) };

      client.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
      });

      return responder.success(req, res, client, { message: "Client has been successfully updated." });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async destroy(req, res) {
    try {
      const client = await database.clients.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id
        }
      });

      if (!client) { return responder.notFound(res, { errors: [notFoundError("Client", req.params.id)] }) };
      client.destroy();
      return responder.success(req, res, client, { message: "Client has been successfully deleted." });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  }
};
