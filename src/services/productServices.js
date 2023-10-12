import * as con from '../../utils/GlobalConstants.mjs';
import CustomError from '../../utils/customError.js';
import { generateAssignProductIdError, generateNewProductError, generateNotFoundProductError, generateSameCodeProductError } from '../../utils/generateProductErrorInfo.js';
import ProductDAO from '../daos/productDAO.js';

const productDAO = new ProductDAO();

export const getAllProducts = async(parameters) => {
    const { limit=10, page=1, query=undefined, sort=undefined } = parameters
    const filter = {};
    if (query) {
        const queries = query.split(",");
        queries.forEach(q => {
            const [key, value] = q.split(":");
            filter[key] = value;
        })
    }
    
    const products = await productDAO.find(filter, limit, page, sort);
    const totalPages = products.totalPages

    const parsedPage = parseInt(page);
    if (isNaN(parsedPage) || parsedPage <= 0 || parsedPage > products.totalPages) {
        throw new Error(`${page} is not a valid page`);
    }
    const productsObjects = products.docs.map(product => product.toObject());
    return {[con.PRODUCTS]: productsObjects, page: parsedPage, totalPages}
}

export const getProductById = async(id) => {
    const product = await productDAO.findById(id);
    if(product){
        return product.toObject();
    }else{
        CustomError.createError({
            message: `Not found a product with ${con.ID} = ${id}`,
            cause: generateNotFoundProductError(id),
            name: "Product Error",
            code: con.EErrors.DATABASE_ERROR
        })
    }
}

export const addProduct = async(productData) => {
    const product = {
        ...productData
    };

    if(!(con.STATUS in productData)){
        product[con.STATUS] = true
    }

    if((con.ID in productData)){
        throw new Error('You can not assign an ID to a product');
    }

    if(!product[con.TITLE] || !product[con.DESCRIPTION] || !product[con.CODE] ||
        !product[con.PRICE] || !product[con.STOCK] || !product[con.CATEGORY]){
        CustomError.createError({
            message: "One or more entities were incomplete or not valid",
            cause: generateNewProductError(product),
            name: "Product Error",
            code: con.EErrors.USER_INPUT_ERROR
        })
    }

    const sameCode = await productDAO.findByCode(product[con.CODE])
    
    if(sameCode){
        throw new Error(`Product with ${con.CODE}:${product[con.CODE]} already exists`);
    }

    const newProduct = await productDAO.create(product)
     
    return newProduct;
}

export const updateProduct = async(id, updatedFields) => {
    if(con.ID in updatedFields){
        CustomError.createError({
            message: "You can not assign or update an ID product",
            cause: generateAssignProductIdError(),
            name: "Product Error",
            code: con.EErrors.USER_INPUT_ERROR
        })
    }
    
    if(con.CODE in updatedFields){
        const sameCode = await productDAO.findByCode(updatedFields[con.CODE]);
        if(sameCode){
            CustomError.createError({
                message: `Product with ${con.CODE}:${sameCode[con.CODE]} already exists`,
                cause: generateSameCodeProductError(sameCode),
                name: "Product Error",
                code: con.EErrors.USER_INPUT_ERROR
            }) 
        };
    }

    const product = await productDAO.findByIdAndUpdate(id, updatedFields, { new: true })
    
    if(product){
        return product.toObject();
    } else{
        CustomError.createError({
            message: `Not found a product with ${con.ID} = ${id}`,
            cause: generateNotFoundProductError(id),
            name: "Product Error",
            code: con.EErrors.USER_INPUT_ERROR
        })
    }
}

export const deleteProduct = async(id) => {
    const product = await productDAO.deleteById(id);
    if(product){
        return product.toObject();
    } else{
        CustomError.createError({
            message: `Not found a product with ${con.ID} = ${id}`,
            cause: generateNotFoundProductError(id),
            name: "Product Error",
            code: con.EErrors.USER_INPUT_ERROR
        })
    }
}