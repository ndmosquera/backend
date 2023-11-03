import GenericRouter from "../router.js";
import SessionController from "../../controllers/sessionController.js";
import { createToken } from "../../middlewares/Tokens.js";
import { areValidUserFields, isValidPassword, isValidUser, isValidUsername } from "../../middlewares/users.js";

let controller = new SessionController()
const { login, register, requestRecovery, validateRecoveryToken, passwordRestore } = controller

export default class SessionRouter extends GenericRouter {
    init() {
        this.create('/login',isValidUser, isValidPassword, createToken, login)
        this.create('/register', areValidUserFields, isValidUsername, register)
        this.create('/request-recovery', requestRecovery)
        this.read('/restore-password', validateRecoveryToken)
        this.create('/restore-password', passwordRestore)
    }
}