const mongoose = require('mongoose')

function connect(uri) {
  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .catch((err) => {
      console.error(`Mongoose connection error: ${err}`)
      console.log('try again in 100ms..')
      return new Promise(resolve => setTimeout(resolve, 100))
        .then(() => connect(uri))
    })
}

module.exports.connect = (uri) => {
  const promise = connect(uri)
  // plug in the promise library:
  mongoose.Promise = global.Promise

  // load models
  require('./category')
  require('./post')
  require('./menu')
  require('./comment')
  require('./configuration')
  require('./block');

  return promise
}
