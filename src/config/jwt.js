import jwt from "jsonwebtoken"
import * as con from '../utils/GlobalConstants.mjs'
import ENV from '../config/env.js'
const { JWT_SECRET } = ENV

export const authenticateToken = (req, res, next ) => {
    const token = req.header("Authorization")

    if(!token){
        return res.status(401).send({
            [con.MSG]: 'No authorized',
            [con.DATA]: null,
            [con.STATUS]: con.ERROR,
        });
    };

    jwt.verify(token, JWT_SECRET, (error, user) => {
        if(error){
            return res.status(403).send({
                [con.MSG]: 'Forbidden',
                [con.DATA]: null,
                [con.STATUS]: con.ERROR,
            });
        };
        req.user = user;
        next();
    });
}