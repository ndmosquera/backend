import crypto from 'crypto'
import ENV from '../../config/env.js'
import * as con from '../../utils/GlobalConstants.mjs'

export default class CartsDTO {
    constructor(obj){
        this[con.PRODUCTS] = obj[con.PRODUCTS]
        if(ENV.NODE_ENV === "development") {
            this[con.ID] = crypto.randomBytes(12).toString("hex")
        } else {
            this[con.ID] = obj[con.ID]
        }

    }

}