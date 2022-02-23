const winston = require('winston');

const options = {
    file: {
        level: 'info',
        filename: 'logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, 
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'silly',
        handleExceptions: true,
        json: false,
        colorize: false,
    },
};

const logger = winston.createLogger({    
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, 
});

logger.stream = {
    write: function (message, encoding) {        
        logger.info(message);
    },
};
module.exports = logger;