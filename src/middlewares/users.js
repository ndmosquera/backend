import * as con from '../utils/GlobalConstants.mjs'
import CustomError from "../utils/customError.js";
import UsersService from "../services/usersServices.js";
import { passwordValidation } from "../config/hash.js";
import { validateToken } from './Tokens.js';

export const isAdminOrPremium = async (req, res, next) => {
    try {
      const user = await validateToken(req, res, next)
      if(!user){
        CustomError.newError(con.ErrorDict.noLogin);
      } else if(user[con.ROLE] != con.ADMIN && user[con.ROLE] != con.PREMIUM){
        CustomError.newError(con.ErrorDict.forbidden);
      }
      req[con.USER] = user
      return next();
    } catch (error) {
      error.from = "middleware";
      return next(error);
    }
  };

  export const isUser = async (req, res, next) => {
    try {
      const user = await validateToken(req, res, next)
      if(!user){
        CustomError.newError(con.ErrorDict.noLogin);
      } else if(user[con.ROLE] != con.USER && user[con.ROLE] != con.PREMIUM){
        CustomError.newError(con.ErrorDict.forbidden);
      }
      req[con.USER] = user
      return next();
    } catch (error) {
      error.from = "middleware";
      return next(error);
    }
  };

  export const areValidUserFields = async (req, res, next) => {
    try {
      const { name, last_name, email, password, username } = req.body;
      if (!name || !last_name || !email || !password || !username) {
        CustomError.newError(con.ErrorDict.incomplete);
      } else {
        return next();
      }
    } catch (error) {
      error.from = "middleware";
      return next(error);
    }
  };
  
  export const isValidUser = async (req, res, next) => {
    try{
      const { username, password } = req.body
      if (!username || !password){
        CustomError.newError(con.ErrorDict.incomplete)
      } else {
        const user = await new UsersService().read(next, {[con.USERNAME]: username})
        if(user[con.STATUS] === con.ERROR){
          CustomError.newError(con.ErrorDict.auth)
        }
        return next()
      }
    } catch(error){
      error.from = "middleware";
      return next(error);
    }
  }
  
  export const isValidPassword = async (req, res, next) => {
    try {
      const { username, password } = req.body
      const user = await new UsersService().read(next, {[con.USERNAME]: username})
      const isValidPassword = await passwordValidation(user[con.DATA], password)
      if(!isValidPassword){
        CustomError.newError(con.ErrorDict.auth)
      }else{
        user[con.DATA][con.PASSWORD] = null
        req[con.USER] = user[con.DATA]
        return next()
      }
    } catch (error){
      error.from = "middleware";
      return next(error);
    }
  }
  
  export const isValidUsername = async (req, res, next) => {
    try {
      const username = req.body[con.USERNAME]
      const exists = await new UsersService().read(next, {[con.USERNAME] : username});
      if (exists && exists[con.STATUS] === con.OK) {
        CustomError.newError(con.ErrorDict.auth);
      } else {
          return next();
      }
  } catch (error) {
    error.from = "middleware";
    return next(error);
  }
};

export const isLogged = async (req, res, next) => {
  try {
    const user = await validateToken(req, res, next)
    if(!user){
      CustomError.newError(con.ErrorDict.noLogin);
    } 
    req[con.USER] = user
    return next();
  } catch (error) {
    error.from = "middleware";
    return next(error);
  }
};
 
