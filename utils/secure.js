import jwt from "jsonwebtoken"
import * as con from '../utils/GlobalConstants.mjs'



export const isLogged = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token){
        return next();
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err){
            return next();
        }
        req.user = user
        return res.status(401).redirect('/profile');
    });

}


export const protectView = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token){
        return res.status(401).redirect('/login');
    }
    
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err){
            return res.status(403).redirect('/login');
        }
        req.user = user
        next()
    });
};