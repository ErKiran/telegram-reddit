const mongoose = require('mongoose');
const fav = new mongoose.Schema({
    telegram_id: { type: Number },
    subreddit: [
        {
            type: String
        }
    ],
    created: Date
});

module.exports = Fav = mongoose.model('favSubreddit', fav);