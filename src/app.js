import express from "express";
import productManager from './productManager.js'



const app = express();

const manager = new productManager('../data/products.json');

app.get('/products', (req, res) => {
    const products = manager.getProducts();
    res.send(products);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await manager.getProductById(Number(id));
    res.send(product);
});

app.listen(8080, () => {
    console.log('Conectado')
})