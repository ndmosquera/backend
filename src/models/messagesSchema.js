import mongoose from "mongoose"
import * as con from '../../utils/GlobalConstants.mjs'

const messagesSchema = new mongoose.Schema({
    [con.USER]: {
        type: String,
        required: true,
    },
    [con.MSG]: {
        type: String,
        required: true,
    },
});


const messagesModel = mongoose.model(con.MESSAGES, messagesSchema)

export default messagesModel