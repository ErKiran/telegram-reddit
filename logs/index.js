const winston = require('winston')
const fs = require('fs')

const logfile = 'logs/test_log.log'

if (!fs.existsSync(logfile)) {
    const fileContent = 'Logfile Created: ' + Date()
    fs.writeFile(logfile, fileContent, (err) => {
        if (err) {
            throw new Error('Error occured while creating log file', err)
        }
    })
}


const logFormat = winston.format.combine(
    //winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `${Date()} ${info.level}: ${info.message}`
    ),
)
const logger = winston.createLogger({
    format: logFormat,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: logfile }),
    ]
})

module.exports = {
    logger
}