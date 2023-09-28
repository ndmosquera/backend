import { Router } from 'express'
import * as productController from '../controllers/productController.js'
import { isADMIN } from '../../utils/secure.js';
  
const productRouter = Router();

productRouter
    .get('/', productController.GETAllProducts)
    .post('/', isADMIN, productController.POSTProduct)
    .get('/:pid', productController.GETProductByID)
    .put('/:pid', isADMIN, productController.PUTProductByID)
    .delete('/:pid', isADMIN, productController.DELETEProductByID);


export default productRouter;