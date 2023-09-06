import passport from "passport";
import local from 'passport-local'
import UserManager from "../dao/MongoDB/usersManager.js";
import * as con from '../../utils/GlobalConstants.mjs'
import GithubStrategy from "passport-github2"
import jwt from 'passport-jwt'
import { SECRET } from './jwt.js'
import cookieExtractor from "../../utils/cookieJWT.js";

const JWTStrategy = jwt.Strategy

const userManager = new UserManager();
const InitLocalStrategy = () => {
    // Register
    passport.use('register', new local.Strategy( {passReqToCallback: true}, 
        async(req, username, password, done) =>{
            const newUser = req.body;
            const userExist = await userManager.getUserByUsername(username);

            if (userExist) return done('This user already exists');

            const user = await userManager.createUser(newUser);

            return done(null, user)
        }
    ))

    // Login
    passport.use('login', new local.Strategy( {passReqToCallback: true}, 
        async(req, username, password, done) =>{

            const user = await userManager.validateUser(username, password);

            if (!user) return done('Wrong credentials');

            return done(null, user)
        }
    ))

    passport.use('github', new GithubStrategy( {
        clientID: con.CLIENT_ID_GITHUB,
        clientSecret: con.GITHUB_KEY,
        callbackURL: con.CALLBACK_URL_GITHUB
    }, async (accessToken, refreshToken, profile, done) => {
        const username = profile._json.login
        const user = await userManager.getUserByUsername(username)

        if(user) return done(null, user)

        const newUser = await userManager.createUser({
            [con.FIRST_NAME]: profile._json.name.split(" ")[0],
            [con.LAST_NAME]: profile._json.name.split(" ")[1],
            username,
            [con.EMAIL]: profile._json.email,
            [con.PASSWORD]: "",
        });

        done(null, newUser);

    }))


    passport.use('current', new JWTStrategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET
    }, async (payload, done) => {
        const user = await userManager.getUserById(payload.sub)

        if(!user) return done('Wrong credentials')

        return done(null, user[con.ID]);

    }))

    passport.serializeUser((user, done) => {
        done(null, user[con.ID])
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getUserById(id);
        done(null, user);
    })

}

export default InitLocalStrategy;