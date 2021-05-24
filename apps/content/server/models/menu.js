const mongoose = require('mongoose')

// define the model schema
const MenuSchema = new mongoose.Schema({
  tenant: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  links: [{
    kind: {
      type: String,
      enum: ['category', 'post', 'http'],
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    value: { text: String, url: String, newWindow: Boolean },
  }],
})

MenuSchema.index({ tenant: 1, name: 1 }, { unique: true })

module.exports = mongoose.model('Menu', MenuSchema)
