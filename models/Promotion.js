const mongoose = require('mongoose')

const PromotionSchema = new mongoose.Schema({
  promotion: String,
  category: String,
  link: String
})

module.exports = mongoose.model('Promotion', PromotionSchema)
