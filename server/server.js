import winston from 'winston';
import app from './app.dev';
import * as logging from './logging';
import socketServer from './socketServer'
import stationStore from './stores/stationStore'
import consoleStore from './stores/consoleStore'

logging.init(app);

const PORT = 9000;

const server = app.listen(PORT, () => {
    winston.info(process.env.NODE_ENV);
    winston.info(`Server listening on port ${PORT}`);
});

stationStore.init();
consoleStore.init();
socketServer(server);


function gracefulShutdown() {
    winston.info('Shutting down server...');
    server.close(() => {
        winston.info('Server shut down.');
        process.exit(0);
    });
    setTimeout(() => {
        winston.info('Server shut down (timeout).');
        process.exit(0);
    }, 2500)
}

process.on('exit', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);