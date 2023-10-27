import { Router } from 'express'
import passport from 'passport';
import * as userServices from '../services/usersServices.js'
import * as productServices from '../services/productServices.js'
import * as cartServices from '../services/cartServices.js'
import * as con from '../utils/GlobalConstants.mjs'


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
        const cid = user[con.CART] ? user[con.CART][con.ID].toString() : undefined
        res.status(201).render('productsView', {products: result[con.PRODUCTS],
                                    currentPage: result.page, 
                                    totalPages: result.totalPages,
                                    cid,
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

productViewsRouter.get('/realtimeproducts', async (req, res) => {
    try{
        const products = await productServices.getAllProducts();
        res.render('realTimeProducts', {products: products})
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
});

export default productViewsRouter;