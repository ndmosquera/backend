import crypto from 'crypto'
import ENV from '../../config/env.js'
import * as con from '../../utils/GlobalConstants.mjs'

export default class TicketsDTO {
    constructor(obj){
        this[con.CODE] = obj[con.CODE]
        this[con.PURCHASE_DATETIME] = Date.now
        this[con.AMOUNT] = obj[con.AMOUNT]
        this[con.PURCHASER] = obj[con.PURCHASER] 
        this[con.PURCHASE] = obj[con.PURCHASE]
        if(ENV.NODE_ENV === "development") {
            this[con.ID] = crypto.randomBytes(12).toString("hex")
        } else {
            this[con.ID] = obj[con.ID]
        }

    }

}