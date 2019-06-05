const mongoose = require('mongoose');
const Rand = new mongoose.Schema({
    telegram_id: Number,
    title: String,
    subreddit: String
})

module.exports = Random = mongoose.model('random', Rand);