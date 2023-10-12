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
                MONGO_URL : process.env.MONGO_URL,           
                USERNAME_DB : process.env.USERNAME_DB,
                PASSWORD_DB : process.env.PASSWORD_DB,
                SECRET_SESSION : process.env.SECRET_SESSION,
                GITHUB_KEY : process.env.GITHUB_KEY,
                CLIENT_ID_GITHUB : process.env.CLIENT_ID_GITHUB,
                SECRET : process.env.SECRET,
                MONGO_URL : process.env.MONGO_URL
}