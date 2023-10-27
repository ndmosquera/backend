import crypto from 'crypto'
import ENV from '../../config/env.js'
import * as con from '../../utils/GlobalConstants.mjs'

export default class UsersDTO {
    constructor(obj){
        this[con.FIRST_NAME] = obj[con.FIRST_NAME]
        this[con.LAST_NAME] = obj[con.LAST_NAME]
        this[con.USERNAME] = obj[con.USERNAME]
        this[con.EMAIL] = obj.hasOwnProperty(con.EMAIL) ? obj[con.EMAIL] : "";
        this[con.AGE] = obj[con.AGE]
        this[con.PASSWORD] = obj[con.PASSWORD]
        this[con.AVATAR] = obj[con.AVATAR]
        this[con.CART] = obj[con.CART]
        this[con.ROLE] = con.USER
        if(ENV.NODE_ENV === "development") {
            this[con.ID] = crypto.randomBytes(12).toString("hex")
        } else {
            this[con.ID] = obj[con.ID]
        }
    }

}