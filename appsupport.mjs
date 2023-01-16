
import { server, port } from './server.mjs';
import { default as DBG } from 'debug';
const debug = DBG('server:debug'); 
const dbgerror = DBG('server:error'); 
import * as util from 'util';

/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
export function onError(error) {
    dbgerror(error);
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        case 'ELOGFILEROTATOR':
            console.error(`Log file initialization failure because `, error.error);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
export function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug(`Listening on ${bind}`);
}


export function handle404(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

export function basicErrorHandler(err, req, res, next) {
    // Defer to built-in error handler if headersSent
    // See: http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
        debug(`basicErrorHandler HEADERS SENT error ${util.inspect(err)}`);
        return next(err)
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    dbgerror(`basicErrorHandler ${err.status || 500} ${util.inspect(res.locals)} ${util.inspect(err)}`);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}

process.on('uncaughtException', function(err) { 
    console.error("I've crashed!!! - "+ (err.stack || err)); 
});


process.on('unhandledRejection', (reason, p) => {
    console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
});


async function catchProcessDeath() {
    debug('Catching SIGTERM, SITINT, SIHUP');
    process.exit(0);
}

process.on('SIGTERM', catchProcessDeath);
process.on('SIGINT', catchProcessDeath);
process.on('SIGHUP', catchProcessDeath);

process.on('exit', () => { debug('exiting...'); });
