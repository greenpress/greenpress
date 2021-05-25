import mongoose from 'mongoose'

module.exports = (uri: string) => {
	mongoose.connect(
		uri,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true
		}
	)
	// plug in the promise library:
	mongoose.Promise = global.Promise

	mongoose.connection.on('error', (err) => {
		console.error(`Mongoose connection error: ${err}`)
		process.exit(1)
	})

	// load models
	require('./models/draft')
}
