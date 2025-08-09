const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: String,
  data: { type: Array, required: true },
  uploadedBy: { type: String, default: 'system' },
  uploadedAt: { type: Date, default: Date.now },
  metadata: {
    rows: Number,
    columns: Array,
    size: Number
  }
}, {
  collection: 'csv_uploads'
})

module.exports = mongoose.model('Data', dataSchema)