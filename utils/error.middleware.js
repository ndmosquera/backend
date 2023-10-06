import * as con from './GlobalConstants.mjs'

const ErrorHandlerMiddleware = (error, req, res, next) => {
    console.log(error.cause)

    switch(error.code){
        case con.EErrors.USER_INPUT_ERROR:
            res.send({[con.STATUS]: con.ERROR, [con.MSG]: error.name})
            break;
        case con.EErrors.DATABASE_ERROR:
            res.send({[con.STATUS]: con.ERROR, [con.MSG]: error.name})
            break;
        default:
            res.send({[con.STATUS]: con.ERROR, [con.MSG]: 'unhandled error'})
            break;
    }
}

export default ErrorHandlerMiddleware;