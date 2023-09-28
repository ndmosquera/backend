import { Router } from 'express'
import * as con from '../../utils/GlobalConstants.mjs'
import * as cartController from '../controllers/cartController.js'
import { isUSER, protectView } from '../../utils/secure.js';


const cartRouter = Router();

cartRouter
    .post('/', cartController.POSTNewCart)
    .get('/:cid', cartController.GETCartByID)
    .post('/:cid/product/:pid', isUSER, cartController.POSTProductInCart)
    .delete('/:cid/product/:pid', cartController.DELETEProductFromCart)
    .put('/:cid', isUSER, cartController.PUTCartByID)
    .put('/:cid/product/:pid',isUSER, cartController.PUTProductInCart)
    .delete('/:cid', cartController.DELETECartByID)
    .post('/:cid/purchase', protectView, cartController.POSTPurchase)

export default cartRouter