import { Router } from 'express'

import * as con from '../../utils/GlobalConstants.mjs'
import CartManager from '../dao/MongoDB/cartManager.js';

const manager = new CartManager(con.PATH_CARTS_FILE);

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try{
        const result = await manager.newCart()
        res.status(200).send({
            [con.DATA] : result,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Cart created successfully'
    });
    } catch (e){
        res.status(502).send({
            [con.STATUS] : con.ERROR,
            [con.MSG] : e.message
        })
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await manager.getCartById(cid);
        res.status(200).send({
            [con.DATA] : cart,
            [con.STATUS] : con.OK,
        });
    }catch (e){
        res.status(502).send({
            [con.STATUS] : con.ERROR,
            [con.MSG] : e.message
        })
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try{
        const { cid } = req.params;
        const { pid } = req.params;
        const result = await manager.addToCart(cid, pid);
        res.status(200).send({
            [con.DATA] : result,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product added to cart successfully'
        });
    }catch (e){
        res.status(502).send({
            [con.STATUS] : con.ERROR,
            [con.MSG] : e.message
        })
    }
})

export default cartRouter