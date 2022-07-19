import express from 'express';
import passport from 'passport';
import homeController from '../controllers/home.controller';
import homeService from '../services/home.service';

export const homeRouter = express.Router();

homeRouter
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), homeService.validateIndex, homeController.index);
