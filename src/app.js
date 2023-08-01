import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js"; 
import productViewsRouter from "./routes/viewsRouter.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import * as con from '../utils/GlobalConstants.mjs'

const conn = mongoose.connect(`mongodb+srv://${con.USERNAME_DB}:${con.PASSWORD_DB}@codercluster.hhamevg.mongodb.net/coder?retryWrites=true&w=majority`)
conn.then(() => console.log('connected'))

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

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

const appServer = app.listen(8080, () => {
    console.log('connected')
});

const io = new Server(appServer);

io.on('connection', socket => {
    console.log(`Se ha conectado un cliente, ID: ${socket.id}`);
});
