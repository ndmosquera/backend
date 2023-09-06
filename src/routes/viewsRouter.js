import { Router } from 'express'
import ProductManager from '../dao/MongoDB/productManager.js';
import MessagesManager from '../dao/MongoDB/msnManager.js';
import CartManager from '../dao/MongoDB/cartManager.js';
import * as con from '../../utils/GlobalConstants.mjs'


const productManager = new ProductManager();
const cartManager = new CartManager();
const messagesManager = new MessagesManager();

const productViewsRouter = Router();

productViewsRouter.get('/products', async (req, res) => {
    try{
        const parameters = req.query
        const products = await productManager.getProducts(parameters);
        const productsObjects = products.docs.map(product => product.toObject());
        res.render('productsView', {products: productsObjects,
                                    currentPage: products.page, 
                                    totalPages: products.totalPages,
                                    name: req.user[con.FIRST_NAME],
                                    lastName: req.user[con.LAST_NAME],
                                    role: req.user[con.ROLE]})
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

productViewsRouter.get('/products/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const product = (await productManager.getProductById(pid)).toObject();
        res.render('productDetail', product)
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

productViewsRouter.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
        const cartObjects = cart[con.PRODUCTS].map(item => item.toObject());
        let totalPrice = 0;
        cartObjects.forEach(product => {
            totalPrice += product[con.ID][con.PRODUCT_PRICE] * product[con.QUANTITY];
        });
        totalPrice = totalPrice.toFixed(2)
        res.status(200).render('cart', {
            cart: cartObjects,
            totalPrice
        });
    } catch (e) {
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

productViewsRouter.get('/realtimeproducts', async (req, res) => {
    try{
        const products = await productManager.getProducts();
        const productsObjects = products.map(product => product.toObject());
        res.render('realTimeProducts', {products: productsObjects})
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

productViewsRouter.get('/chat', async(req, res) => {
    const io = req.io;
    const messages = await messagesManager.getMessages();
    const messagesObjects = messages.map(message => message.toObject());
    io.emit('chatHistory', messagesObjects)
    res.render('chat')
})


export default productViewsRouter;