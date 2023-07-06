import express from "express";
import productManager from './productManager.js'

const app = express();

app.use(express.urlencoded({extended:true})) 

const manager = new productManager('../data/products.json');

app.get('/products', async (req, res) => {
    const products = await manager.getProducts();
    const { limit } = req.query
    res.send(
        limit
        ? products.slice(0, limit)
        : products
        );
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await manager.getProductById(Number(pid));
    res.send(product);
});

app.listen(8080, () => {
    console.log('Conectado')
})