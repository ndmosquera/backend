import { Router } from 'express'
import * as con from '../../utils/GlobalConstants.mjs'
import * as cartController from '../controllers/cartController.js'


const cartRouter = Router();

cartRouter
    .post('/', cartController.POSTNewCart)
    .get('/:cid', cartController.GETCartByID)
    .post('/:cid/product/:pid', cartController.POSTProductInCart)
    .delete('/:cid/product/:pid', cartController.DELETEProductFromCart)
    .put('/:cid', cartController.PUTCartByID)
    .put('/:cid/product/:pid', cartController.PUTProductInCart)
    .delete('/:cid', cartController.DELETECartByID)

export default cartRouter