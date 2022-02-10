require('dotenv').config();
global.env = process.env.NODE_ENV || 'development';
const config = require('./config/' + global.env);

import express from 'express';
import logger from 'morgan';
import passport from 'passport';
import cors from 'cors';
import database from './models';
import { rootRouter } from './routes/index.router';
import { configJWTStrategy } from './helpers/passport.helper';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database.sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.use(logger('dev'));

app.use(passport.initialize());
configJWTStrategy();

app.use('/api', rootRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Policy Desk application.' });
});

app.listen(config.port, () => {
  console.log(`Server is running at PORT http://localhost:${config.port}`);
});
