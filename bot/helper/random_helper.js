const { RedditSimple } = require('reddit-simple');
const keyboard = require('../../keyboard');
const { bot } = require('../bot');
const Random = require('../../models/random');
const { sub } = require('../top');
const { post_helpers } = require('./post_helpers');

module.exports = {
    random_helper: function random_helper() {
        bot.once('message', async msg => {
            if (msg.text) {
                const res = await RedditSimple.RandomPost(msg.text);
                const db = new Random({ res });
                db.save();
                if (!(res.length) == 0) {
                    const data = res[0].data;
                    sub.subreddit = data.subreddit;
                    post_helpers(data, msg.chat.id);
                } else {
                    bot.sendMessage(msg.chat.id, `There is no such sub-reddit as ${msg.text}`)
                }
                setTimeout(() => { bot.sendMessage(msg.chat.id, 'Choose a action', { reply_markup: keyboard.options }) }, 1500)
            }
        })
    }
}