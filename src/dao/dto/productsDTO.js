import crypto from 'crypto'
import ENV from '../../config/env.js'
import * as con from '../../utils/GlobalConstants.mjs'

export default class ProductsDTO {
    constructor(obj) {
        this[con.TITLE] = obj[con.TITLE]
        this[con.DESCRIPTION] = obj[con.DESCRIPTION]
        this[con.CODE] = obj[con.CODE]
        this[con.PRICE] = obj[con.PRICE]
        this[con.STATUS] = obj[con.STATUS]
        this[con.STOCK] = obj[con.STOCK]
        this[con.CATEGORY] = obj[con.CATEGORY]
        this[con.THUMBNAIL] = obj[con.THUMBNAIL]
        if(ENV.NODE_ENV === "development") {
            this[con.ID] = crypto.randomBytes(12).toString("hex")
        } else {
            this[con.ID] = obj[con.ID]
        }
    }
}
