import { addColors, createLogger, format, transports } from "winston";
const { simple, colorize } = format

const levels = {
    HTTP: 0,
    INFO: 1,
    WARNING: 2,
    ERROR: 3,
    FATAL: 4
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
        })
    ]
})