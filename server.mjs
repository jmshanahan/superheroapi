import dotenv from 'dotenv';
dotenv.config();
import { default as express } from 'express';
import { default as bodyParser } from 'body-parser';
import { approotdir } from './approotdir.mjs';
import * as http from 'http';
import { router as indexRouter } from './routes/index.mjs';

const __dirname = approotdir;
export const app = express();

// export const port = normalizePort(process.env.PORT || '3000');
const port = process.env.PORT || '3000';


app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);

const server = http.createServer(app);
app.listen(port, () => console.log(`Strted on port ${port}`));


