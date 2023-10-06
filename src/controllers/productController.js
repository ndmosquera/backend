import * as con from '../../utils/GlobalConstants.mjs'
import * as productServices from '../services/productServices.js'


export const GETAllProducts = async(req, res) => {
    try{
        const parameters = req.query
        const products = await productServices.getAllProducts(parameters);
        res.status(200).send({ [con.STATUS]: con.OK, [con.DATA]: products });
    } catch (e){
        console.log(e)
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
}

export const POSTProduct = async(req, res) => {
    const body = req.body;
    const io = req.io;
    try{
        const newProduct = await productServices.addProduct(body);
        io.emit('productCreated', newProduct)
        res.status(200).send({
            [con.DATA] : newProduct,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product added successfully'
        });
    }catch (e){
        console.log(e)
            res.status(502).send({
                [con.STATUS] : con.ERROR,
                [con.MSG] : e.message
            });
        }    
}

export const GETProductByID = async(req, res) => {
    try{
        const { pid } = req.params;
        const product = await productServices.getProductById(pid);
        res.status(200).send({ [con.STATUS]: con.OK, [con.DATA]: product });
    } catch (e){
        console.log(e)
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
}

export const PUTProductByID = async(req, res) => {
    try{
        const { pid } = req.params;
        const body = req.body;
        const result = await productServices.updateProduct(pid, body);
        res.status(200).send({
            [con.DATA] : result,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product updated successfully'
        });
    }catch (e){
        console.log(e)
            res.status(502).send({
                [con.STATUS] : con.ERROR,
                [con.MSG] : e.message
            })
        }    
}

export const DELETEProductByID = async(req, res) => {
    try{
        const { pid } = req.params;
        const result = await productServices.deleteProduct(pid);
        const io = req.io;
        io.emit('productDeleted', pid)
        res.status(200).send({
            [con.DATA] : result,
            [con.STATUS] : con.OK,
            [con.MSG] : 'Product deleted successfully'
        });
    }catch (e){
        console.log(e)
            res.status(502).send({
                [con.STATUS] : con.ERROR,
                [con.MSG] : e.message
            })
    }
}

