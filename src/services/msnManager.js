import messagesModel from '../models/messages.schema.js'

class MessagesManager {
    constructor(){};

    async getMessages(){
        const messages = await messagesModel.find();
        return messages;
    }

    async addMessage(message){
        const newMessage = await messagesModel.insertMany([message]);
        return newMessage;
    }
}

export default MessagesManager;