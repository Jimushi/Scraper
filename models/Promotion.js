const mongoose = require('mongoose')

const PromotionSchema = new mongoose.Schema({
  promotion: String,
  category: String,
  link: String,
  timestamps: true
})

module.exports = mongoose.model('Promotion', PromotionSchema)
