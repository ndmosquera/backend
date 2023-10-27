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

export const isADMIN = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token){
        return res.send({[con.STATUS]: con.ERROR, [con.MSG]: "You need to login"});
    }
    
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err){
            return res.send({[con.STATUS]: con.ERROR, [con.MSG]: "Validation Error"});
        }
        if (user.sub.role !== "admin") {
            return res.send({[con.STATUS]: con.ERROR, [con.MSG]: "Endpoint available just for admin"});
        }
        req.user = user
        next()
    });
};

export const isUSER = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token){
        return res.status(401).send({[con.STATUS]: con.ERROR, [con.MSG]: "You need to login"});
    }
    
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err){
            return res.status(403).send({[con.STATUS]: con.ERROR, [con.MSG]: "Validation Error"});
        }
        if (user.sub.role !== "user") {
            return res.status(403).send({[con.STATUS]: con.ERROR, [con.MSG]: "Endpoint available just for users"});
        }
        req.user = user
        next()
    });
};