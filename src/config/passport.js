import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import ENV from './env.js'
import { validateUser } from '../utils/usersFunctions.js';
import { generateToken } from '../utils/authFuctions.js';
import * as con from '../utils/GlobalConstants.mjs'
import UsersService from '../services/usersServices.js';
import jwt from 'passport-jwt'

const usersService = new UsersService()
const JWTStrategy = jwt.Strategy

passport.use('login',
  new LocalStrategy({passReqToCallback: true},
    async (req, param, param1, done) => {
      const { username, password } = req.body
      const user = await validateUser(username, password);
      if (!user) return done('');
      
      const token = generateToken({sub: user});
      user.token = token
            
      req.res.cookie("accessToken", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    });
    return done(null, user)
  })
);

// passport.use('current', new JWTStrategy({
  
// }))


passport.serializeUser((user, done) => {
  done(null, user[con.ID]);
});

passport.deserializeUser( async(id, done) => {
  const user = await usersService.read({[con.ID] : id})
  done(null, user);
});


export { passport };
