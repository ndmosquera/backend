import * as con from '../utils/GlobalConstants.mjs'
import CustomError from "../utils/customError.js";
import CartsService from '../services/cartsServices.js';
import ProductsService from '../services/productsServices.js';
import { addProductToCart } from '../utils/productsFunctions.js';


export const validatedUpdateCart = async (req, res, next) => {
    try {

        const cartsService = new CartsService()
        const productsService = new ProductsService()

        const quantity = Number(req.body[con.QUANTITY])
        const { pid } = req.params;
        const cid = req[con.USER][con.CART]

        const cartResponse = await cartsService.read(next, cid)
        const productResponse = await productsService.read(next, {query:`${con.ID}:${pid}`})
        // console.log(productResponse)
        if (quantity < 0) CustomError.newError(con.ErrorDict.badRequest)
        else if(cartResponse[con.STATUS] === con.ERROR) CustomError.newError(con.ErrorDict.badRequest)
        else if(productResponse[con.STATUS] === con.ERROR) CustomError.newError(con.ErrorDict.badRequest)  
        
        const products = cartResponse[con.DATA]
        const updateProducts = addProductToCart(products, pid, quantity)

        req[con.DATA] = updateProducts

      return next();
    } catch (error) {
      error.from = "middleware";
      return next(error);
    }
  };