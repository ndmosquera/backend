import * as con from './GlobalConstants.mjs'

export const generateNotFoundUserError = (id) => {
    return `Not found a user with ${con.ID} = ${id}`
}

export const generateAssignUserIdError = () => {
    return "You can not assign or update an ID user"
}