import CartManager from '../services/cartManager.js';
import * as con from '../../utils/GlobalConstants.mjs'


const cartManager = new CartManager();

export const POSTNewCart = async (req, res) => {
    try{
        const result = await cartManager.newCart()
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
};

export const GETCartByID = async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
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
};

export const POSTProductInCart = async (req, res) => {
    try{
        const { cid, pid } = req.params;
        const result = await cartManager.addToCart(cid, pid);
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
};

export const DELETEProductFromCart = async(req, res) => {
    try{
        const { cid, pid } = req.params;
        const result = await cartManager.deleteProductFromCart(cid, pid);
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
};

export const PUTCartByID = async (req, res) => {
    try{
        const { cid } = req.params;
        const productsArray = req.body;
        const result = await cartManager.updateAllCart(cid, productsArray);
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
};

export const PUTProductInCart = async (req, res) => {
    try{
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await cartManager.addQuantityProduct(cid, pid, quantity);
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
};

export const DELETECartByID = async (req, res) => {
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
};