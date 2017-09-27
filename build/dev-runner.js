const {fork} = require('child_process');
const webpack = require('webpack');
const path = require('path');
const winston = require('winston');

const webpackServerConfig = require('./webpack.server');
const buildPaths = require('../buildpaths');

let compiler = webpack(webpackServerConfig);
let child;
let logger;

let isExiting = false;

function setupLogging() {
    winston.loggers.add('webpack:server', {
        console: {
            colorize: true,
            label: 'webpack:server'
        }
    });
    logger = winston.loggers.get('webpack:server');
}

function init() {
    setupLogging();
    logger.info('Starting Webpack...');
    startWebpack()
        .then(() => {
            logger.info('Webpack Started');
            startServer();
        })
        .catch((reason) => {
            logger.error('Failed to start webpack', reason);
        });
}

function startWebpack() {
    return new Promise((resolve, reject) => {
        compiler.watch({}, (err, status) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(status.toString({
                colors: true
            }));
            if (child && child.connected) {
                child.on('close', startServer);
                child.on('exit', (code) => logger.info(`Server exited with a code of ${code}`));
                killServer();
            }
            resolve();
        });
    });
}

function startServer() {
    logger.info('Starting server...');
    child = fork(path.join(buildPaths.output.base, buildPaths.server.outputName));
}

function killServer() {
    logger.info('Killing server...');
    child.kill('SIGINT');
}

init();

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

function gracefulShutdown() {
    logger.info('Received kill signal.');
    isExiting = true;
    killServer();
}