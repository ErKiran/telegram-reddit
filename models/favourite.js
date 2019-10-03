const mongoose = require('mongoose');
const fav = new mongoose.Schema({
    telegram_id: { type: Number },
    subreddit: [
        {
            name: {
                type: String
            }
        }
    ]
});

module.exports = Fav = mongoose.model('favSubreddit', fav);