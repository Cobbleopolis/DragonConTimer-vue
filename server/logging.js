import fs from 'fs'
import path from 'path'
import config from 'config'
import winston from 'winston';
import expressWinston from 'express-winston';

const logFolder = path.resolve('.', config.get('logFolder'));

export function init(app) {
    if (!fs.existsSync(logFolder))
        fs.mkdirSync(logFolder);
    winston.configure({
        transports: [
            new (winston.transports.Console)({
                prettyPrint: true,
                colorize: true
            }),
            new (winston.transports.File)({
                name: 'general-log-file',
                filename: path.join(logFolder, 'dcTimer.log'),
                json: false
            }),
            new (winston.transports.File)({
                name: 'debug-log-file',
                filename: path.join(logFolder, 'debug.log'),
                level: 'debug',
                json: false
            })
        ]
    });
    winston.setLevels(winston.config.syslog.levels);
    winston.addColors(winston.config.syslog.colors);
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                prettyPrint: true,
                colorize: true
            })
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) {
            return false;
        } // optional: allows to skip some log messages based on request and/or response
    }));
}