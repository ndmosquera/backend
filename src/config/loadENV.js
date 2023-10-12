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

export default { ENV : process.env.ENV,
                PORT : process.env.PORT,
                NODE_ENV : process.env.NODE_ENV,
                MONGO_URL : process.env.MONGO_URL

}