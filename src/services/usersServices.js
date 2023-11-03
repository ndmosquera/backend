import * as con from '../utils/GlobalConstants.mjs';
import UsersRepository from '../repositories/usersRepository.js';
import TokensRepository from '../repositories/tokensRepository.js';
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import ENV from '../config/env.js'
import CustomError from '../utils/customError.js';

export default class UsersService {
    constructor() {
        this.repository = new UsersRepository()
        this.tokenRepo = new TokensRepository()
        this. transporter = nodemailer.createTransport({
            service: ENV.MAIL_SERVICE,
            auth: {
              user: ENV.USER_EMAIL,
              pass: ENV.PASSWORD_EMAIL
            }
          });
    }

    create = async (next, data) => {
        try {
            // Password encrypt
            const salt = await bcrypt.genSalt(10)
            data[con.PASSWORD] =  await bcrypt.hash(data[con.PASSWORD], salt)

            let response = await this.repository.create(next, data)
            return response
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }

    read = async (next, parameter) => {
        try {
            let response = await this.repository.read(next, parameter)
            return response            
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }
    
    update = async (next, pid, data) => {
        try {
            let response = await this.repository.update(next, pid, data)
            return response            
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }
    
    destroy = async (next, pid) => {
        try {
            let response = await this.repository.destroy(next, pid)
            return response
        } catch (error) {
            error.from = 'service'
            return next(error)
        }

    }

    requestRecovery = async(next, email) => {
        try {
            const token = crypto.randomBytes(32).toString('hex');
            await this.tokenRepo.create({[con.TOKEN]: token, [con.EMAIL]: email})
            const recoveryLink = `http://localhost:${ENV.PORT}/requestRecovery?token=${token}`
            const mailOptions = {
                from: ENV.USER_EMAIL,
                to: email,
                subject: 'Recuperación de contraseña',
                text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${recoveryLink}`
              };
    
              this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    CustomError(con.ErrorDict.auth)
                  } else {
                    return {
                        [con.MSG] : 'Correo de recuperación enviado: ' + info.response,
                        [con.DATA] : null,
                        [con.STATUS]: con.OK 
                      }
                  }
              })
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }

    validateRecoveryToken = async(next, token) => {
        try {
            const validatedToken = await this.tokenRepo.read({[con.TOKEN]:token})
            if(validatedToken[con.STATUS] === con.ERROR || 
                Date.now() - validatedToken[con.TOKEN_TIME] > 3600000){
                    CustomError(con.ErrorDict.auth)
                }else {
                    return {
                        [con.MSG] :"Token Valido",
                        [con.DATA] : null,
                        [con.STATUS]: con.OK 
                    } 
                }
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }


    passwordRestore = async(token, newPassword) => {
        try {
            let tokenResponse = await this.tokenRepo.read({[con.TOKEN]:token})
            const email = tokenResponse[con.DATA][con.EMAIL]
            const id = tokenResponse[con.DATA][con.ID]
            let response = await this.repository.update({[con.EMAIL]: email}, newPassword)
            await this.tokenRepo.destroy(id)
            return response            
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }
    
}
