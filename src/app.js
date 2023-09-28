import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js"; 
import productViewsRouter from "./routes/productViewRouter.js";
import userViewRouter from "./routes/userViewRouter.js";
import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from 'http'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"

import * as con from '../utils/GlobalConstants.mjs'
import session from "express-session";
import MongoStore from "connect-mongo";
import InitLocalStrategy from "./config/passport.js";
import passport from "passport";
import authRouter from "./routes/authRouter.js";

import dotenv from 'dotenv'
import { Command } from 'commander'
import chatViewsRouter from "./routes/chatViewRouter.js";
import MessagesManager from "./services/msnManager.js";

// Config Environments Variables
const program = new Command();
program.option('--mode <mode>', 'mode of execution', 'local')
program.parse();
const options = program.opts();
dotenv.config({
    path: options.mode == 'production' ? './.env.production' : './.env'
})


// Mongo Configuration
export const conn = await mongoose.connect(process.env.MONGO_URL)

// Express Middleware
const app = express();
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

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
    mongoUrl: process.env.MONGO_URL,
    ttl: 3600
  }),
  ttl: 3600,
}));

// Passport Init
InitLocalStrategy();
app.use(passport.initialize());
app.use(passport.session());

const httpServer = HTTPServer(app)
const io = new SocketServer(httpServer)

// Routes
app.use('/', userViewRouter)
app.use('/productViews', productViewsRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use('/chat', chatViewsRouter)
app.use('/api/auth', authRouter)
// app.use('/api/session', sessionRouter)

// Middleware that redirects to login
app.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
});

const messagesManager = new MessagesManager()

// WebSocket
io.on('connection', async socket => {
    console.log(`Se ha conectado un cliente, ID: ${socket.id}`);
    const messages = await messagesManager.getMessages();
    const messagesObjects = messages.map(message => message.toObject());
    io.emit('chatHistory', messagesObjects)

    socket.on("sendMessage", async(data) => {
      const { message, username } = data;

      io.emit("newMessage", { message, user:username});
    });

});

// App Connection
httpServer.listen(process.env.PORT, () => {
    console.log(`connected, PORT:${process.env.PORT}`)
});
