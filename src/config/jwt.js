import jwt from "jsonwebtoken"
import * as con from '../../utils/GlobalConstants.mjs'
export const SECRET = "8D48D9DEBB7E6C76C296DF8BFB9F3"


export const generateToken = (user) => 
    jwt.sign(user, SECRET, {expiresIn:"1h"});

// export const JWTMW = (req, res, next) => {
//     const authHeader = req.headers.authorization; 
//     if(!authHeader) return res.status(403).send({[con.STATUS]: con.ERROR, [con.MSG]: "Not Authorized"})

//     const token = authHeader.split(" ")[1]

//     try{
//         const user = jwt.verify(token, SECRET);
//         req.user = user.user
//         next()
//     } catch (e) {
//         return res.status(403).send({[con.STATUS]: con.ERROR, [con.MSG]: e})
//     }
// }

export const JWTCookieMW = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).send({[con.STATUS]: con.ERROR, [con.MSG]: "Not Authorized"})

    try {
        const valid = jwt.verify(token, SECRET);
        next();
    } catch (e) {
        return res.status(403).send({[con.STATUS]: con.ERROR, [con.MSG]: e})
    }
}