import { Router } from "express";
import generateProduct from "../../utils/generateProducts.js";




const mocksRouter = Router();

mocksRouter.get('/mockingproducts', (req, res) =>{
    const products = []
    for (let i = 0; i < 100; i++){
        products.push(generateProduct())
    }
    res.send(products)
})


export default mocksRouter;