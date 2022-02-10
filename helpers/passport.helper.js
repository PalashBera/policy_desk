require('dotenv').config();

import Passport from 'passport';
import PassportJWT from 'passport-jwt';
import database from '../models';

export const configJWTStrategy = () => {
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  Passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      database.users.findByPk(payload.id).then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }).catch(err => {
        return done(err);
      });
    })
  );
};
