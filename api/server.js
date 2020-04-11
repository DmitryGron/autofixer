'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'v-response';
import config from 'config';
import user from './src/routes/user';
import InitiateMongoServer from './config/db';

InitiateMongoServer();
const port = process.env.PORT || config.get('app.port');
const prefix = config.get('api.prefix');
const app = express();

app.get('/', (req, res) => {
	res.json({ message: 'API Working' });
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization,x-api-key');
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(prefix, user);
app.listen(port, logger.log('listing on port', port));
