import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js"; 
import productViewsRouter from "./routes/viewsRouter.js";
import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from 'http'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import MessagesManager from './dao/MongoDB/msnManager.js';
// const messagesManager = new MessagesManager()
import * as con from '../utils/GlobalConstants.mjs'
import session from "express-session";

export const conn = await mongoose.connect(`mongodb+srv://${con.USERNAME_DB}:${con.PASSWORD_DB}@codercluster.hhamevg.mongodb.net/ecommerce?retryWrites=true&w=majority`)

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const httpServer = HTTPServer(app)
const io = new SocketServer(httpServer)

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: "sd21df56156dgf1h35fd4651zxc",


  resave: true,
  saveUninitialized: true
}))

app.use(express.static(`${__dirname}/public`))



app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/', productViewsRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)



io.on('connection', async socket => {
    console.log(`Se ha conectado un cliente, ID: ${socket.id}`);
    // const messages = await messagesManager.getMessages();
    // const messagesObjects = messages.map(message => message.toObject());
    // io.emit('chatHistory', messagesObjects)
});


httpServer.listen(8080, () => {
    console.log('connected')
});
