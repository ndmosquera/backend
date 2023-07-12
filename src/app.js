import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";


const app = express();

app.use(express.urlencoded({extended:true})) 
app.use(express.json())
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.listen(8080, () => {
    console.log('connected')
}) 