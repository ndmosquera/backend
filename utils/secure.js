import jwt from "jsonwebtoken"
import * as con from '../utils/GlobalConstants.mjs'


export const protectView = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}

export const isLogged = (req, res, next) => {
    if(req.session.user) return res.redirect('/profile');
    next();
}