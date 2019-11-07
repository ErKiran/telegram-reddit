const mongoose = require('mongoose');
const Rand = new mongoose.Schema({
    telegram_id: Number,
    title: String,
    subreddit: String,
    link: String,
    created: Date
})

module.exports = Random = mongoose.model('random', Rand);