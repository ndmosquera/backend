import { Router } from 'express'
import passport from 'passport';
import * as userServices from '../services/usersServices.js'
import * as productServices from '../services/productServices.js'
import * as cartServices from '../services/cartServices.js'
import * as con from '../../utils/GlobalConstants.mjs'


// const userManager = new UserManager()
// const productManager = new ProductManager();
// const cartManager = new CartManager();
// const messagesManager = new MessagesManager();

const productViewsRouter = Router();

productViewsRouter.get('/products', passport.authenticate("current", {session: false}), async (req, res) => {
    try{
        const parameters = req.query
        const user = await userServices.getUserById(req.user);
        const result = await productServices.getAllProducts(parameters)
        res.status(201).render('productsView', {products: result[con.PRODUCTS],
                                    currentPage: result.page, 
                                    totalPages: result.totalPages,
                                    name: user[con.FIRST_NAME],
                                    lastName: user[con.LAST_NAME],
                                    role: user[con.ROLE]})
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

productViewsRouter.get('/products/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const product = await productServices.getProductById(pid);
        res.render('productDetail', product)
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

productViewsRouter.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.getCartById(cid);
        let totalPrice = 0;
        cart.forEach(product => {
            totalPrice += product[con.ID][con.PRICE] * product[con.QUANTITY];
        });
        totalPrice = totalPrice.toFixed(2)
        res.status(200).render('cart', {
            cart: cart,
            totalPrice
        });
    } catch (e) {
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

productViewsRouter.get('/realtimeproducts', async (req, res) => {
    try{
        const products = await productServices.getAllProducts();
        res.render('realTimeProducts', {products: products})
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

export default productViewsRouter;