import * as con from './GlobalConstants.mjs'
import prodConfig from '../src/config/loggers/config.prod.js';
import devConfig from '../src/config/loggers/config.dev.js';
import ENV from '../src/config/loadENV.js'

let config

if (ENV.NODE_ENV === 'production') {
    config = prodConfig;
  } else {
    config = devConfig;
  }


const ErrorHandlerMiddleware = (error, req, res, next) => {
    req.logger = config
    req.logger.FATAL(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()} - ${error.message}`)
    switch(error.code){
        case con.EErrors.USER_INPUT_ERROR:
            res.status(400).send({[con.STATUS]: con.ERROR, [con.MSG]: error.name})
            break;
        case con.EErrors.DATABASE_ERROR:
            res.status(500).send({[con.STATUS]: con.ERROR, [con.MSG]: error.name})
            break;
        default:
            res.status(501).send({[con.STATUS]: con.ERROR, [con.MSG]: error.message})
            break;
    }
}

export default ErrorHandlerMiddleware;