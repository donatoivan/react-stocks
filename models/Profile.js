const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  stocks: [
    {
      symbol: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      units: {
        type: Number,
        required: true
      },
      purchasePrice: {
        type: Number,
        required: true
      }
    }
  ],
  soldStocks: [
    {
      symbol: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      units: {
        type: Number,
        required: true
      },
      purchasePrice: {
        type: Number,
        required: true
      },
      soldPrice: {
        type: Number,
        required: true
      }
    }
  ]
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)