import messagesModel from '../models/messagesSchema.js'

class MessagesManager {
    constructor(){};

    async getMessages(){
        const messages = await messagesModel.find();
        return messages;
    }

    async addMessage(message){
        const newMessage = await messagesModel.create(message);
        return newMessage;
    }
}

export default MessagesManager;