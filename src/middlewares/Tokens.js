import jwt from "jsonwebtoken";
import ENV from '../config/env.js'
import * as con from '../utils/GlobalConstants.mjs'
import CustomError from "../utils/customError.js";
import UsersService from "../services/usersServices.js";

export const createToken = async (req, res, next) => {
    try {
      const user = req.user;
      const token = jwt.sign(user, ENV.JWT_SECRET, { expiresIn: "1h" });
      console.log(token)
      req[con.TOKEN] = token;
      return next();
    } catch (error) {
      error.from = "middleware";
      return next(error);
    }
  };


export const validateToken = async (req, res, next) => {
  const token = req.headers[con.TOKEN];
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    
    const userId = decoded[con.ID];
    const userService = new UsersService();
    const user = await userService.read(next, { [con.ID]: userId });
    
    return user[con.DATA];
  } catch (error) {
    error.from = "middleware";
    return next(error);
  }
};