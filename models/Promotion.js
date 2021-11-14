const mongoose = require('mongoose')

const PromotionSchema = new mongoose.Schema(
  {
    title: String,
    promotion: String,
    category: String,
    link: String,
    sent: Boolean
  },
  { timestamps: true }
)

module.exports = mongoose.model('Promotion', PromotionSchema)
