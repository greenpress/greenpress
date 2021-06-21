import mongoose from 'mongoose';

export const connect = (uri:string) => {
	mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
	// plug in the promise library:
	mongoose.Promise = global.Promise;


	mongoose.connection.on('error', (err) => {
		console.error(`Mongoose connection error: ${err}`);
		process.exit(1);
	});

	// load models
	require('./user');
};
