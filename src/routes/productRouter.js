import { Router } from 'express'
import ProductManager from '../productManager.js';
import * as con from '../../utils/GlobalConstants.mjs'

const manager = new ProductManager(con.PATH_PRODUCTS_FILE);



const productRouter = Router();

productRouter.get('/', async (req, res) => {
    try{
        const products = manager.getProducts();
        const { limit } = req.query
        res.status(200).send(
            limit
            ? products.slice(0, limit)
            : products
            );
    } catch (e){
        res.status(502).send({error : true, message : e.message})
    }
});

productRouter.post('/', async (req, res) => {
    const body = req.body;
    const io = req.io;
    try{
        const result = await manager.addProduct(body);
        io.emit('productCreated', result)
        res.status(200).send('Product added successfully');
    }catch (e){
        if(e.message.includes('All fields are required') || e.message.includes('already exists')){
            res.status(400).send({ error : true, message : e.message});
        }else{
            res.status(502).send({ error : true, message : e.message});
        }
    }
});

productRouter.get('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const product = await manager.getProductById(Number(pid));
        res.status(200).send(product);
    }catch (e){
        if(e.message.includes("Not found")){
            res.status(404).send({error : true, message: e.message})
        }else{
            res.status(502).send({error : true, message: e.message})
        }
    }
});


productRouter.put('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const body = req.body;
        const result = await manager.updateProduct(Number(pid), body);
        res.status(200).send(result);
    }catch (e){
        if(e.message.includes("Not found")){
            res.status(404).send({error : true, message: e.message})
        }else{
            res.status(502).send({error : true, message: e.message})
        }
    }
});

productRouter.delete('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const result = await manager.deleteProduct(Number(pid));
        const io = req.io;
        io.emit('productDeleted', pid)
        res.status(200).send(result);
    }catch (e){
        if(e.message.includes("Not found")){
            res.status(404).send({error : true, message: e.message})
        }else{
            res.status(502).send({error : true, message: e.message})
        }
    }
});

export default productRouter;