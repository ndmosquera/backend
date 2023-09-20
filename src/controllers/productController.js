import * as con from '../../utils/GlobalConstants.mjs'
import ProductManager from '../services/productManager.js';


const productManager = new ProductManager();

export const GETAllProducts = async(req, res) => {
    try{
        const parameters = req.query
        const products = await productManager.getProducts(parameters);
        const productsObjects = products.docs.map(product => product.toObject());
        res.status(200).send({ [con.STATUS]: con.OK, [con.DATA]: productsObjects });
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
}

export const POSTProduct = async(req, res) => {
    const body = req.body;
    const io = req.io;
    try{
        const newProduct = await productManager.addProduct(body);
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
}

export const GETProductByID = async(req, res) => {
    try{
        const { pid } = req.params;
        const product = (await productManager.getProductById(pid)).toObject();
        res.status(200).send({ [con.STATUS]: con.OK, [con.DATA]: product });
    } catch (e){
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
}

export const PUTProductByID = async(req, res) => {
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
}

export const DELETEProductByID = async(req, res) => {
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
}

