import { Router } from 'express'
import mongoose from 'mongoose';
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
        const { cid, pid } = req.params;
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
});

cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try{
        const { cid, pid } = req.params;
        const result = await manager.deleteProductFromCart(cid, pid);
        res.status(200).send({
            [con.DATA] : result,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product deleted from cart successfully'
        });
    }catch (e){
        res.status(502).send({
            [con.STATUS] : con.ERROR,
            [con.MSG] : e.message
        })
    }
})

cartRouter.put('/:cid', async (req, res) => {
    try{
        const { cid } = req.params;
        const productsArray = req.body;
        const result = await manager.updateAllCart(cid, productsArray);
        res.status(200).send({
            [con.DATA] : result[con.DATA],
            [con.STATUS] : result[con.STATUS],
            [con.MSG] : result[con.MSG]
        });
    }catch (e){
        res.status(502).send({
            [con.STATUS] : con.ERROR,
            [con.MSG] : e.message
        })
    }
});

cartRouter.put('/:cid/product/:pid', async (req, res) => {
    try{
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await manager.addQuantityProduct(cid, pid, quantity);
        res.status(200).send({
            [con.DATA] : result,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product quantity updated successfully'
        });
    }catch (e){
        res.status(502).send({
            [con.STATUS] : con.ERROR,
            [con.MSG] : e.message
        })
    }
});

cartRouter.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        
        const result = await manager.removeAllProducts(cid);
        
        res.status(200).send({
            [con.DATA]: result,
            [con.STATUS]: con.OK,
            [con.MSG]: 'All products removed from cart successfully'
        });
    } catch (e) {
        res.status(502).send({
            [con.STATUS]: con.ERROR,
            [con.MSG]: e.message
        });
    }
});


export default cartRouter