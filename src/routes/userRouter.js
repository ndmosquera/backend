import { Router } from 'express'
import UserManager from '../dao/MongoDB/usersManager.js';
import * as con from '../../utils/GlobalConstants.mjs'
import { isLogged, protectView } from '../../utils/secure.js';
import passport from 'passport';
import { generateToken } from '../config/jwt.js';

const userRouter = Router()

const userManager = new UserManager();



userRouter.get("/login", isLogged, async (req, res) =>{
    const {loginError = false} = req.query
    res.render("login", {loginError})
}) 


// userRouter.post("/login", (req, res, next) => {
//     passport.authenticate('login', (err, user) => {
//       if (!user) {
//         return res.redirect('/login?loginError=true');
//       }
//       req.logIn(user, function(err) {
//         if (err) {
//           return next(err);
//         }
//         return res.redirect('/productViews/products');
//       });
//     })(req, res, next);
//   });

userRouter.post('/login', async(req, res) => {
    const user = await userManager.validateUser(req.body[con.USERNAME], req.body[con.PASSWORD])
    if (!user) {
    return res.redirect('/login?loginError=true');
    }

    const token = generateToken({
        sub: user[con.ID],
        user: {[con.USERNAME]: user[con.USERNAME]}
    });
    res.cookie("accessToken", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    });

    res.status(200).send({[con.STATUS]: con.OK, accessToken: token});

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

userRouter.get("/profile", passport.authenticate("current", {session: false}), async (req, res) =>{
    const user = await userManager.getUserById(req.user);
    res.render('profile', {name: user[con.FIRST_NAME], last_name: user[con.LAST_NAME], username: user[con.USERNAME], email: user[con.EMAIL], role: user[con.ROLE]})  
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