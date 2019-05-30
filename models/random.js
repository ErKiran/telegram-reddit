const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = Random = mongoose.model('Random', new Schema({}, { strict: false }))