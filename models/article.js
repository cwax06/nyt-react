var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title: String,
  date: Date,
  url: String,
  notes: String
});

module.exports = articleSchema;
