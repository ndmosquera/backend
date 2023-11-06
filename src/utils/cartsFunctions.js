import * as con from '../utils/GlobalConstants.mjs'



export const liquidateCart = (user, cart, products) => {
    let response = {}

    // Total Amount
    let amount = 0;
    for (const item of cart) {
        const pid = item[con.ID]
        const quantity = item[con.QUANTITY]
        const product = products.find((p) => p[con.ID] === pid)
        amount += product[con.PRICE] * quantity
    }

    response[con.CODE] = Date.now().toString(36) + Math.random().toString(36);
    response[con.AMOUNT] = amount
    response[con.PURCHASER] = user[con.EMAIL]
    response[con.PURCHASE] = cart
    response[con.PURCHASE_DATETIME] = Date.now()

    return response
}