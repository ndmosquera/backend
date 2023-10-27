import { Router } from "express";
import * as con from '../utils/GlobalConstants.mjs'
import passport from "passport";

const authRouter = Router()


authRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), (req, res) => {
    
})


authRouter.get('/callback', passport.authenticate('github',
    {failureRedirect: '/login',
    successRedirect: '/productViews/products'}), 
    (req, res) => {}
)


export default authRouter