import { Router } from 'express'
import ProductManager from '../productManager.js';
import * as con from '../../utils/GlobalConstants.mjs'

const manager = new ProductManager(con.PATH_PRODUCTS_FILE);



const productViewsRouter = Router();


productViewsRouter.get('/', async (req, res) => {
    try{
        const products = manager.getProducts(); 
        res.render('home', {products: products})
    } catch (e){
        res.status(502).send({error : true, message : e.message})
    }
});

productViewsRouter.get('/realtimeproducts', async (req, res) => {
    try{
        const products = manager.getProducts(); 
        res.render('realTimeProducts', {products: products})
    } catch (e){
        res.status(502).send({error : true, message : e.message})
    }
});


export default productViewsRouter;