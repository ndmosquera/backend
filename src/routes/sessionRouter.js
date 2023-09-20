import { Router } from 'express'
import * as con from '../../utils/GlobalConstants.mjs'
import passport from 'passport';
import UserManager from '../services/usersManager.js';

const sessionRouter = Router()

const userManager = new UserManager();

sessionRouter.get("/current", passport.authenticate("current", {session: false}), async (req, res) =>{
    const user = await userManager.getUserById(req.user);
    res.status(200).send({[con.STATUS]: con.OK, [con.DATA]: user})
}) 

export default sessionRouter;