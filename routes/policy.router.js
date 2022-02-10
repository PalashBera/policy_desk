import express from 'express';
import passport from 'passport';
import policyController from '../controllers/policy.controller';
import policyService from '../services/policy.service';

export const policyRouter = express.Router();

policyRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), policyController.index)
  .post(passport.authenticate('jwt', { session: false }), policyService.validateCreate, policyController.create);

policyRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), policyController.show)
  .put(passport.authenticate('jwt', { session: false }), policyService.validateUpdate, policyController.update)
  .delete(passport.authenticate('jwt', { session: false }), policyController.destroy);
