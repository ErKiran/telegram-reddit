const mongoose = require('mongoose');


const Post = new mongoose.Schema({
    telegram_id: Number,
    title: String,
    subreddit: String
});

module.exports = RedditPost = mongoose.model('post', Post);