import cartModel from "../models/cartSchema.js";

export default class CartDAO {
    constructor() {}

    async create(){
        return await cartModel.create();
    };

    async find(){
        return await cartModel.find();
    };

    async findById(id){
        return await cartModel.findById(id);
    };

    async findOneAndUpdate(cart, action, args){
        return await cartModel.findOneAndUpdate(cart, action, args)
    };

    async findByIdAndUpdate(id, action, args){
        return await cartModel.findByIdAndUpdate(id, action, args);
    };
}