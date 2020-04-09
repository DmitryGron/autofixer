import logger from 'v-response';
import mongoose from 'mongoose';
import config from 'config';

const db = config.get('database.url');

const InitiateMongoServer = async () => {
	mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => logger.log('connected to mongoDB', db))
	.catch(err => logger.log('error mongodb', err));
};

module.exports = InitiateMongoServer;
