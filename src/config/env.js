// Config Environments Variables

import { Command } from "commander";
import dotenv from 'dotenv'

const program = new Command();

program.option('--mode <mode>', 'mode of execution', 'dev')
program.parse();
const options = program.opts();
dotenv.config({
    path: options.mode == 'production' ? './.env.production' : './.env.dev'
})

export default {PORT : process.env.PORT,
                NODE_ENV : process.env.NODE_ENV,         
                GITHUB_KEY : process.env.GITHUB_KEY,
                CLIENT_ID_GITHUB : process.env.CLIENT_ID_GITHUB,
                JWT_SECRET : process.env.JWT_SECRET,
                LINK_DB : process.env.LINK_DB,
                MAIL_SERVICE : process.env.MAIL_SERVICE,
                USER_EMAIL : process.env.USER_EMAIL,
                PASSWORD_EMAIL : process.env.USER_EMAIL,
}