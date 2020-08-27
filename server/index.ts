import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

const PORT = process.env.PORT || 80;
const app: Application = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => console.log('Server is listening... '));
