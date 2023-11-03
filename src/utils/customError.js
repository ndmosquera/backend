export default class CustomError {

    static newError({status, message, from}) {
        let error = new Error(message)
        error.message = message
        error.status = status
        error.from = from
        throw error
    }


}
 