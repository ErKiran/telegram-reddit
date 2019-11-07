const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    telegram_id: Number,
    title: String,
    type: String,
    subreddit: String,
    link: String,
    inserted: Date
});

module.exports = RedditPost = mongoose.model('post', Post);