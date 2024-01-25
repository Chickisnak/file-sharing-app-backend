const mongoose = require('mongoose')

const fileschema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  sender: {
    type: String,
    required: false
  },
  receiver: {
    type: String,
    required: false
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('file', fileschema);