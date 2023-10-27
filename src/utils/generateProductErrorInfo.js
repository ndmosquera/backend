import * as con from './GlobalConstants.mjs'

export const generateNewProductError = (product) => {
    return `One or more entities were incomplete or not valid, expected:
    * ${con.TITLE}: to be string, received: ${typeof product[con.TITLE]}
    * ${con.DESCRIPTION}: to be string, received: ${typeof product[con.DESCRIPTION]}
    * ${con.CODE}: to be string, received: ${typeof product[con.CODE]}
    * ${con.PRICE}: to be Number, received: ${typeof product[con.PRICE]}
    * ${con.STOCK}: to be Number, received: ${typeof product[con.STOCK]}
    * ${con.CATEGORY}: to be string, received: ${typeof product[con.CATEGORY]}   
    `
}

export const generateNotFoundProductError = (id) => {
    return `Not found a product with ${con.ID} = ${id}`
}

export const generateAssignProductIdError = () => {
    return "You can not assign or update an ID product"
}

export const generateSameCodeProductError = (code) => {
    return `Product with ${con.CODE}:${code} already exists`
}
