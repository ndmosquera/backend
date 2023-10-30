import crypto from 'crypto'
import ENV from '../../config/env.js'
import * as con from '../../utils/GlobalConstants.mjs'

export default class TokensDTO {
    constructor(obj){
        this[con.TOKEN] = obj[con.TOKEN]
        this[con.EMAIL] = obj[con.EMAIL]
        if(ENV.NODE_ENV === "development") {
            this[con.ID] = crypto.randomBytes(12).toString("hex")
            this[con.TOKEN_TIME] = Date.now()
        } else {
            this[con.ID] = obj[con.ID]
        }
    }

}