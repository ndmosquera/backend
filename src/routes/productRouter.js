import { Router } from 'express'
import ProductManager from '../dao/MongoDB/productManager.js';
import * as con from '../../utils/GlobalConstants.mjs'

const manager = new ProductManager();


  
const productRouter = Router();

productRouter.get('/', async (req, res) => {
    try{
        const parameters = req.query
        const products = await manager.getProducts(parameters);
        const data = products.docs;
        delete products.docs;
        console.log(products)
        res.status(200).send(
            {[con.DATA] : data,
              ...products,
             [con.STATUS] : con.OK}
            );
    } catch (e){
        res.status(502).send({[con.STATUS] : con.ERROR, [con.MSG] : e.message})
    }
});

productRouter.post('/', async (req, res) => {
    const body = req.body;
    const io = req.io;
    try{
        const newProduct = await manager.addProduct(body);
        io.emit('productCreated', newProduct)
        res.status(200).send({
            [con.DATA] : newProduct,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product added successfully'
        });
    }catch (e){
            res.status(502).send({
                [con.STATUS] : con.ERROR,
                [con.MSG] : e.message
            });
        }
});

productRouter.get('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const product = await manager.getProductById(pid);
        res.status(200).send({
            [con.DATA] : product,
            [con.STATUS] : con.OK
        });
    }catch (e){
            res.status(502).send({
                [con.STATUS] : con.ERROR,
                [con.MSG] : e.message
            })
        }
});

productRouter.put('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const body = req.body;
        const result = await manager.updateProduct(pid, body);
        res.status(200).send({
            [con.DATA] : result,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product updated successfully'
        });
    }catch (e){
            res.status(502).send({
                [con.STATUS] : con.ERROR,
                [con.MSG] : e.message
            })
        }
});

productRouter.delete('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const result = await manager.deleteProduct(pid);
        const io = req.io;
        io.emit('productDeleted', pid)
        res.status(200).send({
            [con.DATA] : result,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product deleted successfully'
        });
    }catch (e){
            res.status(502).send({
                [con.STATUS] : con.ERROR,
                [con.MSG] : e.message
            })
    }
});

export default productRouter;