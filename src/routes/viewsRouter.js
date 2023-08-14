import { Router } from 'express'
import ProductManager from '../dao/MongoDB/productManager.js';
import MessagesManager from '../dao/MongoDB/msnManager.js';
import * as con from '../../utils/GlobalConstants.mjs'


const productManager = new ProductManager();
const messagesManager = new MessagesManager()

const productViewsRouter = Router();

productViewsRouter.get('/', async (req, res) => {
    try{
        const { limit=10, page=1, query=undefined, sort=undefined } = req.query
        const products = await productManager.getProducts(limit, page, query, sort);
        const productsObjects = products.docs.map(product => product.toObject());
        res.render('home', {products: productsObjects})
    } catch (e){
        res.status(502).send({error : true, message : e.message})
    }
});

productViewsRouter.get('/realtimeproducts', async (req, res) => {
    try{
        const products = await productManager.getProducts();
        const productsObjects = products.map(product => product.toObject());
        res.render('realTimeProducts', {products: productsObjects})
    } catch (e){
        res.status(502).send({error : true, message : e.message})
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