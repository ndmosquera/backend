export default class CustomError {

    static createError({message, cause, name = 'Error', code = 0}){

        const error = new Error(message, {cause})
        error.name = name
        error.code = code
        throw error
    }
}
 