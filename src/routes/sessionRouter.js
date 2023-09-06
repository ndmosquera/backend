import { Router } from 'express'
import UserManager from '../dao/MongoDB/usersManager.js';
import * as con from '../../utils/GlobalConstants.mjs'
import passport from 'passport';

const sessionRouter = Router()

const userManager = new UserManager();

sessionRouter.get("/current", passport.authenticate("current", {session: false}), async (req, res) =>{
    const user = await userManager.getUserById(req.user);
    res.status(200).send({[con.STATUS]: con.OK, [con.DATA]: user})
}) 

export default sessionRouter;