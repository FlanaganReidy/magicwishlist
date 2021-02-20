
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  multiverseid:{type: Number, unique: true}
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card;