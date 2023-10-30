import GenericRouter from "../router.js";
import AuthController from "../../controllers/authController.js";
import { passport } from '../../config/passport.js'

let controller = new AuthController()
const { login, register, requestRecovery, validateRecoveryToken, passwordRestore } = controller

export default class AuthRouter extends GenericRouter {
    init() {
        this.create('/login', passport.authenticate('login'),login)
        this.create('/register', register)
        this.create('/request-recovery', requestRecovery)
        this.read('/restore-password', validateRecoveryToken)
        this.create('/restore-password', passwordRestore)
    }
}