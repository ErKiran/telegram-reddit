const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    telegram_id: Number,
    title: String,
    subreddit: String,
    inserted: Date
});

module.exports = RedditPost = mongoose.model('post', Post);