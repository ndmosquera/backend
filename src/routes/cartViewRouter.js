import { Router } from 'express'
import passport from 'passport';
import * as con from '../utils/GlobalConstants.mjs'
import * as cartServices from '../services/cartServices.js'
import { isUSER, protectView } from '../../utils/secure.js';


const cartViewRouter = Router();

cartViewRouter.get('/:cid', passport.authenticate("current", {session: false}), async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await cartServices.getCartById(cid);
        let totalPrice = 0;
        cart.forEach(product => {
            totalPrice += product[con.ID][con.PRICE] * product[con.QUANTITY];
        });
        totalPrice = totalPrice.toFixed(2)
        res.status(201).render('cartView', {products: cart, totalPrice, cid})
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});



export default cartViewRouter