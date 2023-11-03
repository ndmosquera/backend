import express from "express";
import ENV from './config/env.js'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import winston from './utils/winston.js'
import cors from 'cors'
import ErrorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import GeneralApiRouter from "./routes/generalRouter.js";
import session from "express-session";
import passport from "passport";

let apiRouter = new GeneralApiRouter()
apiRouter = apiRouter.getRouter()


// Express Middleware
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(winston)

app.use(session({
    secret: ENV.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  }));

app.use(passport.initialize());
app.use(passport.session());
  

// Routes
app.use('/api', apiRouter)

// Error Handler Middleware
app.use(ErrorHandler)
app.use(notFoundHandler)


// App Connection
app.listen(ENV.PORT, () => {
    console.log(`connected, PORT:${ENV.PORT}`)
});
