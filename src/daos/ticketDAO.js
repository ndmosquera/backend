import ticketModel from "../models/ticketSchema.js";
import * as con from "../../utils/GlobalConstants.mjs"


export default class TicketDAO {
    constructor() {}

    create = async (purchase) => {
        return await ticketModel.create(purchase);
    };


}