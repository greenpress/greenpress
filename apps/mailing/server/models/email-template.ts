const mongoose = require('mongoose')

// define the Provider model schema
const EmailTemplateSchema = new mongoose.Schema({
  tenant: {
    type: String,
    index: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  predefinedPublicVariables: [String],
  authentication: String
})

export default mongoose.model('EmailTemplate', EmailTemplateSchema)
