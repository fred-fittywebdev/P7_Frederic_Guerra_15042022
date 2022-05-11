require('dotenv').config();

import { routes } from './routes/routes.routes';
// IMPORTS
import express, { Request, Response } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';

// database connection
createConnection().then((connection) => {
	const app = express();

	app.use(express.json());
	app.use(cookieParser());

	app.use(cors());

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
		);
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		next();
	});

	app.get('/', (req: Request, res: Response): void => {
		res.send('Hello World');
	});

	routes(app);

	app.listen(8080, (): void => {
		console.log('Listenning on port 8080');
	});
});
