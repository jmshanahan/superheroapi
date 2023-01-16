import dotenv from 'dotenv';
dotenv.config();
import { default as express } from 'express';
import { default as bodyParser } from 'body-parser';
import { approotdir } from './approotdir.mjs';
import * as http from 'http';
import cors from 'cors';
import { default as logger } from 'morgan';
import { default as rfs } from 'rotating-file-stream';

import { default as DBG } from 'debug';
const debug = DBG('server:debug'); 
const dbgerror = DBG('server:error'); 

import {
    normalizePort, onError, onListening, handle404, basicErrorHandler
} from './appsupport.mjs';


// server.listen(port, () => console.log(`Strted on port ${port}`));
import { router as indexRouter } from './routes/index.mjs';

const __dirname = approotdir;
const app = express();

export const port = normalizePort(process.env.PORT || '3000');

app.use(logger(process.env.REQUEST_LOG_FORMAT || 'combined', {
    // immediate: true,
    stream: process.env.REQUEST_LOG_FILE ?
        rfs.createStream(process.env.REQUEST_LOG_FILE, {
            size:     '10M', // rotate every 10 MegaBytes written
            interval: '1d',  // rotate daily
            compress: 'gzip' // compress rotated files
        })
        : process.stdout
}));


app.set('port', port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// error handlers
// catch 404 and forward to error handler
//app.use(handle404);
app.use(basicErrorHandler);


app.use('/', indexRouter);

export const server = http.createServer(app);

server.listen(port);
server.on('request', (req, res) => {
    debug(`${new Date().toISOString()} request ${req.method} ${req.url}`);
});
server.on('error', onError);
server.on('listening', onListening);


export default app;

