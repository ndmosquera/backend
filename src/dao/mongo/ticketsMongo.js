import ticketModel from "../models/ticketSchema.js";
import * as con from '../../utils/GlobalConstants.mjs'

export default class TicketsMongo {
    constructor(){}

    create = async (data) => {
        try {
            let one = await ticketModel.create(data)
            return {
                [con.MSG] : "Ticket created successfully",
                [con.DATA] : one,
                [con.STATUS] : con.OK
            }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }


    read = async (id = null) => {
        try {
            if(id){
                const ticket = await ticketModel.findById(id);
                if (ticket) {
                    return {
                        [con.MSG]: 'Ticket found successfully',
                        [con.DATA]: ticket,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: `There is no ticket with ID = ${id}`,
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
                }
            } else {
            let all = await ticketModel.find();
                if(all.length > 0){
                    return {
                        [con.MSG] : "Tickets read successfully",
                        [con.DATA] : all,
                        [con.STATUS] : con.OK
                    }
                } else {
                    return {
                        [con.MSG]: "There are no tickets to show",
                        [con.DATA] : null,
                        [con.STATUS] : con.ERROR
                    };
                }
            }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS] : con.ERROR
            }
        }
    }

    update = async (id, data) => {
        try {
            let one = await ticketModel.findByIdAndUpdate(id, data, {new : true})
            if(one){
                return {
                    [con.MSG] : "Ticket updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no ticket with ID = ${id}`,
                    [con.DATA] : null,
                    [con.STATUS] : con.ERROR
                };
            }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS] : con.ERROR 
            }
        }
    }

    destroy = async (id) => {
        try {
            let one = await ticketModel.findByIdAndDelete(id)
            if (one){
                return {
                    [con.MSG] : "Ticket deleted successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no ticket with ID = ${id}`,
                    [con.DATA] : null,
                    [con.STATUS] : con.ERROR
                };
            }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS] : con.ERROR 
            }
        }
        
    }
}