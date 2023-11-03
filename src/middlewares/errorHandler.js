import * as con from '../utils/GlobalConstants.mjs'
import prodConfig from '../config/loggers/config.prod.js';
import devConfig from '../config/loggers/config.dev.js';
import ENV from '../config/env.js'

let config

if (ENV.NODE_ENV === 'production') {
    config = prodConfig;
  } else {
    config = devConfig;
  }


const ErrorHandler = (error, req, res, next) => {
    return res.status(error.status || 500).json({
        [con.MSG] : error.message,
        [con.DATA] : req.method + ":" + req.url + ":" + error.from,
        [con.STATUS] : error.status || 500
    })
}

export default ErrorHandler;