const { RedditSimple } = require('reddit-simple');
const keyboard = require('../../keyboard');
const { bot } = require('../bot');
const { post_helpers } = require('./post_helpers');
const rand = {};
const Random = require('../../models/random');

module.exports = {
    random_helper: function random_helper() {
        bot.once('message', async msg => {
            if (msg.text) {
                const res = await RedditSimple.RandomPost(msg.text);
                if (!(res.length) == 0) {
                    const data = res[0].data;
                    const newPost = new Random({
                        telegram_id: msg.chat.id,
                        title: data.title,
                        subreddit: data.subreddit
                    });
                    const found = await Random.find({ telegram_id: msg.chat.id, title: data.title, subreddit: data.subreddit });
                    if (found.length == 0 || found == 'undefined' || found == null) {
                        await newPost.save();
                    }
                    rand.subreddit = data.subreddit;
                    post_helpers(data, msg.chat.id);
                } else {
                    bot.sendMessage(msg.chat.id, `There is no such sub-reddit as ${msg.text}`)
                }
                setTimeout(() => { bot.sendMessage(msg.chat.id, 'Choose a action', { reply_markup: keyboard.options }) }, 1500)
            }
        })
    },
    rand
}