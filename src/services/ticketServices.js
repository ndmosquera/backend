import TicketDAO from '../daos/ticketDAO.js'
import * as con from '../../utils/GlobalConstants.mjs';


const ticketDAO = new TicketDAO();

export const createTicket = async(data) => {
    data[con.CODE] = Date.now().toString(36) + Math.random().toString(36);
    const newTicket = await ticketDAO.create(data)
    return newTicket.toObject();
}