import { Router } from "express";
import MessagesManager from "../services/msnManager.js";
import { isUSER } from "../../utils/secure.js";
import * as con from '../../utils/GlobalConstants.mjs'

const chatViewsRouter = Router();

const messagesManager = new MessagesManager();


chatViewsRouter.get('/', isUSER, async(req, res) => {
    const username = req.user.sub[con.USERNAME]
    const accessToken = req.cookies.accessToken
    res
    .cookie("Token", accessToken)
    .cookie("username", username)
    .render('chat')
})

chatViewsRouter.post('/', isUSER,  async(req, res) => {
    const body = req.body
    await messagesManager.addMessage(body);
    res.send(body)
})

export default chatViewsRouter;
