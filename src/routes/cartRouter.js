import { Router } from 'express'

import * as con from '../../utils/GlobalConstants.mjs'
import CartManager from '../cartManager.js';

const manager = new CartManager(con.PATH_CARTS_FILE);

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try{
        const result = await manager.newCart()
        res.status(200).send(result);
    } catch (e){
        res.status(502).send({error : true, message: e.message})
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await manager.getCartById(Number(cid));
        res.status(200).send(cart);
    }catch (e){
        if(e.message.includes("Not found")){
            res.status(404).send({error : true, message: e.message})
        }else{
            res.status(502).send({error : true, message: e.message})
        }
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try{
        const { cid } = req.params;
        const { pid } = req.params;
        const result = await manager.addToCart(Number(cid), Number(pid));
        res.status(200).send(result);
    }catch (e){
        res.status(502).send({error : true, "message" : e.message})
    }
})

export default cartRouter