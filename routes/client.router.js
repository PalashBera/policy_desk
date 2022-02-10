import express from 'express';
import passport from 'passport';
import clientController from '../controllers/client.controller';
import clientService from '../services/client.service';

export const clientRouter = express.Router();

clientRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), clientController.index)
  .post(passport.authenticate('jwt', { session: false }), clientService.validateCreate, clientController.create);

clientRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), clientController.show)
  .put(passport.authenticate('jwt', { session: false }), clientService.validateUpdate, clientController.update)
  .delete(passport.authenticate('jwt', { session: false }), clientController.destroy);
