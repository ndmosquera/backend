import { Router } from 'express'
import * as productController from '../controllers/productController.js'
  
const productRouter = Router();

productRouter
    .get('/', productController.GETAllProducts)
    .post('/', productController.POSTProduct)
    .get('/:pid', productController.GETProductByID)
    .put('/:pid', productController.PUTProductByID)
    .delete('/:pid', productController.DELETEProductByID);


export default productRouter;