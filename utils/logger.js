const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
transports:
    new transports.File({
    filename: 'logs/server.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
});
// const winston = require('winston');
// const logConfiguration = {
//     transports: [
//         new winston.transports.Console({
//             level: 'info'
//         }),
//         new winston.transports.File({
//             level: 'error',
//             // Create the log directory if it does not exist
//             filename: 'logs/example.log'
//         })
//     ],
//     format: winston.format.combine(
//         winston.format.label({
//             label: `Label🏷️`
//         }),
//         winston.format.timestamp({
//            format: 'MMM-DD-YYYY HH:mm:ss'
//        }),
//         winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
//     )
// };

// const logger = winston.createLogger(logConfiguration);

// // Log a message
// logger.log({
//     // Message to be logged
//         message: 'Hello, Winston!',
    
//     // Level of the message logging
//         level: 'error'
//     });
//     // Log a message
//     logger.info('Hello, ronel!');
    