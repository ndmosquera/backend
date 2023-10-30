import * as con from '../utils/GlobalConstants.mjs';
import UsersRepository from '../repositories/usersRepository.js';
import TokensRepository from '../repositories/tokensRepository.js';
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import ENV from '../config/env.js'

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

    create = async (data) => {
        try {

            // VALIDATIONS

            // Required Fields
            if (!data[con.FIRST_NAME] || !data[con.LAST_NAME] || !data[con.USERNAME] || !data[con.PASSWORD]) {
                return {
                  [con.MSG]: `Missing required fields: ${con.FIRST_NAME}, ${con.LAST_NAME}, ${con.USERNAME}, and ${con.PASSWORD}`,
                  [con.DATA]: null,
                  [con.STATUS]: con.ERROR,
                };
              }

              // Role Field
              if (con.ROLE in data) {
                return {
                  [con.MSG]: `The "${con.ROLE}" field is not allowed`,
                  [con.DATA]: null,
                  [con.STATUS]: con.ERROR,
                };
              }

              // User exist
              const userExist = await this.read({[con.USERNAME]: data[con.USERNAME]})
              if(userExist[con.STATUS] === con.OK){
                return {
                    [con.MSG]: 'This user already exists',
                    [con.DATA]: null,
                    [con.STATUS]: con.ERROR,
                  };
              }

              // Password encrypt
              const salt = await bcrypt.genSalt(10)
              data[con.PASSWORD] =  await bcrypt.hash(data[con.PASSWORD], salt)


            let response = await this.repository.create(data)
            return response
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    read = async (parameter) => {
        try {
            let response = await this.repository.read(parameter)
            return response            
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }
    
    update = async (pid, data) => {
        try {
            let response = await this.repository.update(pid, data)
            return response            
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }
    
    destroy = async (pid) => {
        try {
            let response = await this.repository.destroy(pid)
            return response
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }

    }

    requestRecovery = async(email) => {
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
                    return {
                        [con.MSG] : error,
                        [con.DATA] : null,
                        [con.STATUS]: con.ERROR 
                      }
                  } else {
                    return {
                        [con.MSG] : 'Correo de recuperación enviado: ' + info.response,
                        [con.DATA] : null,
                        [con.STATUS]: con.OK 
                      }
                  }
              })
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            } 
        }
    }

    validateRecoveryToken = async(token) => {
        try {
            const validatedToken = await this.tokenRepo.read({[con.TOKEN]:token})
            if(validatedToken[con.STATUS] === con.ERROR || 
                Date.now() - validatedToken[con.TOKEN_TIME] > 3600000){
                    return {
                        [con.MSG] :"El token ha expirado o no es válido",
                        [con.DATA] : null,
                        [con.STATUS]: con.ERROR 
                    } 
                }else {
                    return {
                        [con.MSG] :"Token Valido",
                        [con.DATA] : null,
                        [con.STATUS]: con.OK 
                    } 
                }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            } 
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
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }
    
}
