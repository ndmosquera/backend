
import * as con from './GlobalConstants.mjs'

export const generateNotFoundCartError = (id) => {
    return `Not found a cart with ${con.ID} = ${id}`
}

export const generateAssignProductIdError = () => {
    return "You can not assign or update an ID product"
}