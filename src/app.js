import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js"; 
import productViewsRouter from "./routes/viewsRouter.js";
import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from 'http'
import mongoose from "mongoose";
import * as con from '../utils/GlobalConstants.mjs'

export const conn = await mongoose.connect(`mongodb+srv://${con.USERNAME_DB}:${con.PASSWORD_DB}@codercluster.hhamevg.mongodb.net/ecommerce?retryWrites=true&w=majority`)

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const httpServer = HTTPServer(app)
const io = new SocketServer(httpServer)

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/', productViewsRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

const msg = [{[con.MSG]: "hola1", [con.USER]: 'ndmosquera'}]
io.on('connection', socket => {
    console.log(`Se ha conectado un cliente, ID: ${socket.id}`);
});


httpServer.listen(8080, () => {
    console.log('connected')
});
