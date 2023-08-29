import { Router } from 'express'
import UserManager from '../dao/MongoDB/usersManager.js';
import * as con from '../../utils/GlobalConstants.mjs'
import { isLogged, protectView } from '../../utils/secure.js';
import passport from 'passport';

const userRouter = Router()

const userManager = new UserManager();



userRouter.get("/login", isLogged, async (req, res) =>{
    const {loginError = false} = req.query
    res.render("login", {loginError})
}) 

userRouter.post("/login", passport.authenticate('login'), async (req, res) =>{
    try{
        res.redirect('/productViews/products');
    } catch(e){
        res.status(502).send({[con.STATUS] : con.ERROR, [con.MSG] : e.message})
    }
}) 


userRouter.get("/register", isLogged, async (req, res) =>{
    res.render("register")
}) 

userRouter.post("/register", passport.authenticate('register'),
 async (req, res) =>{
    try{
        res.redirect('/profile');
    } catch (e){
        res.status(502).send({[con.STATUS] : con.ERROR, [con.MSG] : e.message})
    }
}) 

userRouter.get("/profile", protectView, async (req, res) =>{
    res.render('profile', {user: req.user}) 
}) 

userRouter.get('/logout', protectView, async(req, res) =>{
    req.session.destroy((er) => {
        res.redirect('/login')
    })
})

userRouter.post('/recoveryPassword', async(req, res) => {
    try{
        const { username, password } = req.body
        const result = await userManager.recoverUserPassword(username, password);
        res.status(200).send({[con.STATUS]: result[con.STATUS],
                              [con.MSG]: 'The password has been changed successfully.'})
    } catch (e){
        res.status(502).send({[con.STATUS] : con.ERROR, [con.MSG] : e.message})
    }
})
  


export default userRouter