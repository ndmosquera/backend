import * as cartServices from '../services/cartServices.js'
import * as ticketServices from '../services/ticketServices.js'
import * as con from '../../utils/GlobalConstants.mjs'


export const GETAllCarts = async (req, res) => {
    try{
        const carts = await cartServices.getAllCarts();
        res.status(200).send({
            [con.DATA] : carts,
            [con.STATUS] : con.OK,
    });
    } catch (e){
        res.status(502).send({
            [con.STATUS] : con.ERROR,
            [con.MSG] : e.message
        })
    }
};

export const POSTNewCart = async (req, res) => {
    try{
        const result = await cartServices.createNewCart();
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
        const cart = await cartServices.getCartById(cid);
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
        const result = await cartServices.addToCart(cid, pid);
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
        const result = await cartServices.deleteProductFromCart(cid, pid);
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
        const result = await cartServices.updateAllCart(cid, productsArray);
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
        const result = await cartServices.addQuantityProduct(cid, pid, quantity);
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
        
        const result = await cartServices.removeAllProducts(cid);
        
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

export const POSTPurchase = async (req, res) => {
    try{
        const { cid } = req.params; 
        const user = req.user.sub;
        const purchaseStatus = await cartServices.finishPurchase(cid)
        const ticket = {
            [con.AMOUNT] : purchaseStatus[con.AMOUNT],
            [con.PURCHASER] : user[con.EMAIL],
            [con.PURCHASE] : purchaseStatus[con.COMPLETE]
        }

        const result = await ticketServices.createTicket(ticket)
        console.log(result)

        res.status(201).send({
            [con.TICKET]: result[con.ID],
            [con.INCOMPLETE]: purchaseStatus[con.INCOMPLETE],
            [con.STATUS]: con.OK
        })
        
    } catch (e){
        res.status(502).send({
            [con.STATUS]: con.ERROR,
            [con.MSG]: e.message
        });
    }
}