const mongoose = require("mongoose")

const MovieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = { Movie }