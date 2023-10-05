import * as con from '../../utils/GlobalConstants.mjs';
import CartDAO from '../daos/cartDAO.js';
import ProductDAO from '../daos/productDAO.js';


const cartDAO = new CartDAO();
const productDAO = new ProductDAO();

export const createNewCart = async () => {
    const cart = {
        [con.PRODUCTS]: []
    };
    return await cartDAO.create(cart);
};

export const getAllCarts = async () => {
    return await cartDAO.find();
};

export const getCartById = async(id) =>{
    const cart = await cartDAO.findById(id)
    if(cart){
        const cartObjects = cart[con.PRODUCTS].map(item => item.toObject());
        return cartObjects;
    }else{
        throw new Error(`Not found a cart with ${con.ID} = ${id}`)
    }
};

export const addToCart = async(cid, pid) =>{
    const cart = await cartDAO.findById(cid);
    if(!cart){
        throw new Error(`Cart with ${con.ID} : ${cid} do not exist`)
    };
    const product = await productDAO.findById(pid);
    if(!product){
        throw new Error(`Product with ${con.ID} : ${pid} do not exist`)
    };
    const updateCart = await cartDAO.findOneAndUpdate(
        {[con.ID] : cid, [`${con.PRODUCTS}.${con.ID}`] : pid},
        {$inc : { [`${con.PRODUCTS}.$.${con.QUANTITY}`] : 1 }},
        {new : true}
    );

    if(!updateCart){
        const newCart = await cartDAO.findOneAndUpdate(
            {[con.ID] : cid},
            {$push : {[con.PRODUCTS]: {
                [con.ID]: pid,
                [con.QUANTITY] : 1
            }}},
            {new : true}
        );
        return newCart
    };
    return updateCart;
};

export const deleteProductFromCart = async(cid, pid) =>{
    const updateCart = await cartDAO.findByIdAndUpdate(
        cid,
        {
            $pull: {[con.PRODUCTS]: {[con.ID]: pid}}
        },
        { new: true}
    );

    if(!updateCart){
        throw new Error(`Not found a cart with ${con.ID} = ${cid}`)
    };

    return updateCart;
};

export const addQuantityProduct = async(cid, pid, qty) => {
    const cart = await cartDAO.findByIdAndUpdate(
        cid,
        { $set: { [`products.$[elem].${con.QUANTITY}`]: qty } },
        { arrayFilters: [{ [`elem.${con.ID}`]: pid }], new: true }
    );

    if (!cart) {
        throw new Error(`Not found a cart with ${con.ID} = ${cid}`);
    }
    const productIndex = cart.products.findIndex(product => product[con.ID].toString() === pid);
    if (productIndex === -1) {
        throw new Error(`Product with ${con.ID} = ${pid} not found in the cart`);
    }
    return cart;
};

export const removeAllProducts = async(cid) =>{
    const cart = await cartDAO.findByIdAndUpdate(
        cid,
        { $set: { [con.PRODUCTS]: [] } },
        { new: true }
    );
    if (!cart) {
        throw new Error(`Not found a cart with ${con.ID} = ${cid}`);
    }
    return cart;
};

export const updateAllCart = async(cid, productsArray) => {
    const cart = await cartDAO.findById(cid);
    if (!cart) {
        throw new Error(`Cart with ID ${cid} not found`);
    }
    const errors = [];
    for (const productItem of productsArray) {
        try {
            const productIndex = cart.products.findIndex(product => product[con.ID].toString() === productItem[con.ID]);
            if (productIndex === -1) {
                await addToCart(cid, productItem[con.ID])    
            }
            await addQuantityProduct(cid, productItem[con.ID], productItem[con.QUANTITY]);
        } catch (e) {
            errors.push(e);
            continue
        };
    };
    const result = {[con.DATA]: await getCartById(cid),
        [con.STATUS]: errors.length !== 0 ? [con.SOME_ERRORS] : [con.OK], 
        [con.MSG]: errors.length !== 0 ? errors : 'Cart updated successfully'
    }
    return result;
};

export const finishPurchase = async (cid) => {
    const cart = await getCartById(cid);
    if (!cart) {
        throw new Error(`Cart with ID ${cid} not found`);
    };
    
    const productErrors = {}
    const productComplete = []
    let total = 0
    for (const item of cart){
        const product = await productDAO.findById(item[con.ID]);
        if(!product){
            productErrors[item[con.ID]] = `Product with ${con.ID} : ${item[con.ID]} do not exist`
            continue
        };
        
        if(product[con.STOCK] < item[con.QUANTITY]){
            productErrors[product[con.ID]] = `Product with ${con.ID} : ${item[con.ID]} do not have enough stock`
        } else {
            const updateFields = {[[con.STOCK]] : product[con.STOCK] - item[con.QUANTITY]}
            await productDAO.findByIdAndUpdate(product[con.ID], updateFields, { new: true })
            productComplete.push({[con.ID]: product[con.ID], [con.QUANTITY]: item[con.QUANTITY]})
            total += product[con.PRICE] * item[con.QUANTITY]
        }
    }
    
    productComplete.map(prod => deleteProductFromCart(cid, prod[con.ID]))

    return {[con.INCOMPLETE] : productErrors, [con.COMPLETE] : productComplete, [con.AMOUNT]: total}
}

