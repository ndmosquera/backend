import { addColors, createLogger, format, transports } from "winston";
const { simple, colorize } = format

const levels = {
    HTTP: 1,
    INFO: 2,
    WARNING: 3,
    ERROR: 4,
    FATAL: 5
}

const colors = {
    HTTP: 'blue',
    INFO: 'white',
    WARNING: 'yellow',
    ERROR: 'cyan',
    FATAL: 'red'
}
addColors(colors)

export default createLogger({
    levels,
    format: colorize(),
    transports: [
        new transports.Console({
            level: 'FATAL',
            format: simple()
        }),

        new transports.File({
            level: 'FATAL',
            format: simple(),
            filename: './errors.log'
        })
    ]
})