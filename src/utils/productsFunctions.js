import * as con from './GlobalConstants.mjs'

export const addProductToCart = (products, pid, quantity) => {
    const existingProduct = products.find((product) => product[con.ID] === pid); 

    if (existingProduct) {
        existingProduct[con.QUANTITY] += quantity;
      } else {
        products.push({ [con.ID]: pid, [con.QUANTITY]: quantity });
      }

      return products
}

export const deletedProductFromCart = (products, pid) => {
  const updatedProducts = products.filter((product) => product[con.ID] !== pid)
  return updatedProducts;
}