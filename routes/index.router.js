import express from 'express';
import { userRouter } from './user.router';
import { policyRouter } from './policy.router';
import { homeRouter } from './home.router';

export const rootRouter = express.Router();
rootRouter.use('/users', userRouter);
rootRouter.use('/policies', policyRouter);
rootRouter.use('/home', homeRouter);
