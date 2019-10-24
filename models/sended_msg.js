const mongoose = require('mongoose');

const Sended = new mongoose.Schema({
    telegram_id: Number,
    title: String,
    subreddit: String,
    inserted: Date,
    type: String
});

module.exports = SendedMessage = mongoose.model('sended_msg', Sended);