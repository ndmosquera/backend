import jwt from "jsonwebtoken"
import ENV from '../config/env.js'

export const generateToken = (user) => 
    jwt.sign(user, ENV.JWT_SECRET, {expiresIn:"1h"});

const cookieExtractor = (req) => {
    const token = req.cookies.accessToken;
    return token ?? null;
}

export default cookieExtractor;