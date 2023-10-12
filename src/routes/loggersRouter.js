import { Router } from "express";
import prodConfig from '../config/loggers/config.dev.js';
import devConfig from '../config/loggers/config.dev.js';
import ENV from '../config/loadENV.js'


let config

if (ENV.NODE_ENV === 'production') {
    config = prodConfig;
  } else {
    config = devConfig;
  }

const loggerRouter = Router();


loggerRouter.get('/loggers', (req, res) => {
    req.logger = config

    req.logger.HTTP(`Prueba logger HTTP ENV: ${ENV.NODE_ENV}`)
    req.logger.INFO(`Prueba logger INFO ENV: ${ENV.NODE_ENV}`)
    req.logger.WARNING(`Prueba logger WARNING ENV: ${ENV.NODE_ENV}`)
    req.logger.ERROR(`Prueba logger ERROR ENV: ${ENV.NODE_ENV}`)
    req.logger.FATAL(`Prueba logger FATAL ENV: ${ENV.NODE_ENV}`)
  
    res.json({ message: 'Prueba de loggers exitosa' });
  });

export default loggerRouter;