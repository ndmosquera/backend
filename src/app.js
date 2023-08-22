import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js"; 
import productViewsRouter from "./routes/viewsRouter.js";
import userRouter from "./routes/userRouter.js";
import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from 'http'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import MessagesManager from './dao/MongoDB/msnManager.js';
// const messagesManager = new MessagesManager()
import * as con from '../utils/GlobalConstants.mjs'
import session from "express-session";
import MongoStore from "connect-mongo";

// Mongo Configuration
const mongoURL = `mongodb+srv://${con.USERNAME_DB}:${con.PASSWORD_DB}@codercluster.hhamevg.mongodb.net/${con.DB_NAME}?retryWrites=true&w=majority`
export const conn = await mongoose.connect(mongoURL)

// Express Middleware
const app = express();
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// WebSocket Middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Handlebars Configuration
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


// Session Configuration
app.use(session({
  secret: con.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongoUrl: mongoURL,
    ttl: 3600
  }),
  ttl: 3600,
}));



const httpServer = HTTPServer(app)
const io = new SocketServer(httpServer)


// Routes
app.use('/', userRouter)
app.use('/productViews', productViewsRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)


// WebSocket
io.on('connection', async socket => {
    console.log(`Se ha conectado un cliente, ID: ${socket.id}`);
    // const messages = await messagesManager.getMessages();
    // const messagesObjects = messages.map(message => message.toObject());
    // io.emit('chatHistory', messagesObjects)
});

// App Connection
httpServer.listen(8080, () => {
    console.log('connected')
});
