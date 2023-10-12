import { Router } from "express";
import prodConfig from '../config/loggers/config.dev.js';
import devConfig from '../config/loggers/config.dev.js';

let config


const loggerRouter = Router();


loggerRouter.get('/api/test-loggers', (req, res) => {
    req.logger = config

    req.logger.HTTP("Prueba logger HTTP")
    req.logger.INFO("Prueba logger INFO")
    req.logger.WARNING("Prueba logger WARNING")
    req.logger.ERROR("Prueba logger ERROR")
    req.logger.FATAL("Prueba logger FATAL")
  
    res.json({ message: 'Prueba de loggers exitosa' });
  });

export default loggerRouter;