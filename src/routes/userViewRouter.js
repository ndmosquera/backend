import { Router } from 'express'
import * as con from '../../utils/GlobalConstants.mjs'
import { isLogged, protectView } from '../../utils/secure.js';
import passport from 'passport';
import * as userServices from '../services/usersServices.js';


const userRouter = Router()


userRouter.get("/login", isLogged, async (req, res) =>{
    const {loginError = false} = req.query
    res.render("login", {loginError})
}) 

userRouter.post(
    '/login',
    passport.authenticate('login', {
        successRedirect: '/productViews/products',
        failureRedirect: '/login?loginError=true'
    }),
    async(req, res) => {}
    );

userRouter.get("/register", isLogged, async (req, res) =>{
    res.render("register")
}) 

userRouter.post("/register", passport.authenticate('register'),
 async (req, res) =>{
    try{
        res.redirect('/profile');
    } catch (e){
        console.log(e)
        res.status(502).send({[con.STATUS] : con.ERROR, [con.MSG] : e.message})
    }
}) 

userRouter.get("/profile", passport.authenticate("current", {session: false}), async (req, res) =>{
    const user = await userServices.getUserById(req.user);
    const cid = user[con.CART] ? user[con.CART][con.ID].toString() : undefined
    res.render('profile', {name: user[con.FIRST_NAME], last_name: user[con.LAST_NAME],
                         username: user[con.USERNAME], email: user[con.EMAIL],
                         role: user[con.ROLE], cid})  
}) 

userRouter.put('/edit', passport.authenticate("current", {session: false}), async (req, res) =>{
    try{
    const updateField = req.body
    const user = await userServices.updateUser(req.user, updateField);
    res.status(200).send({
        [con.DATA] : user,
        [con.STATUS] : con.OK,
    });
    } catch{
        res.status(502).send({
            [con.STATUS] : con.ERROR,
            [con.MSG] : e.message
        })
    }
}) 

userRouter.get('/logout', protectView, (req, res) => {
    res.clearCookie("accessToken");
    res.redirect('/login');
  });
  


userRouter.post('/recoveryPassword', async(req, res) => {
    try{
        const { username, password } = req.body
        const result = await userServices.recoverUserPassword(username, password);
        res.status(200).send({[con.STATUS]: result[con.STATUS],
                              [con.MSG]: 'The password has been changed successfully.'})
    } catch (e){
        console.log(e)
        res.status(502).send({[con.STATUS] : con.ERROR, [con.MSG] : e.message})
    }
})
  

export default userRouter