const mongoose = require('mongoose');
const subScription = new mongoose.Schema({
    telegram_id: { type: Number },
    subreddit: String,
    type: String
});

module.exports = Sub = mongoose.model('sub', subScription);