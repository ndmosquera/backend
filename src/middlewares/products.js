import CustomError from "../utils/customError.js";
import * as con from '../utils/GlobalConstants.mjs'
import UsersService from "../services/usersServices.js";

export const areValidProductsFields = async (req, res, next) => {
    try {
        //Required Fields
        const title = req.body[con.TITLE]
        const description = req.body[con.DESCRIPTION]
        const code = req.body[con.CODE]
        const price = req.body[con.PRICE]
        const stock = req.body[con.STOCK]
        const category = req.body[con.CATEGORY]
      
      if (!title || !description || !code || !price || !stock || !category) {
        CustomError.newError(con.ErrorDict.incomplete);
      } else if (!(typeof price === "number") || !(typeof stock === "number")){
        CustomError.newError(con.ErrorDict.badRequest);
      } else if (con.ID in req.body){
        CustomError.newError(con.ErrorDict.forbidden);
      }
      
      const exist = await new UsersService().read(next, {[con.CODE]: code})
      if(exist[con.STATUS] === con.OK){
        CustomError.newError(con.ErrorDict.badRequest);
      } else {
        return next();
      }

    } catch (error) {
      error.from = "middleware";
      return next(error);
    }
  };