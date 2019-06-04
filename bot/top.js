const { bot } = require('./bot');
const { RedditSimple } = require('reddit-simple');
const Post = require('../models/subreddit');
const keyboard = require('../keyboard');
const { dynamic } = require('../keyboard/dynamic');
const { helpers } = require('./post_helper');
const sub = {};


bot.onText(/\/top/, async msg => {
    bot.once('message', async msg => {
        if (msg.text) {
            const res = await RedditSimple.TopPost(msg.text);
            if (!(res.length) == 0) {
                const data = res[0].data;
                const newPost = new Post({
                    telegram_id: msg.chat.id,
                    title: data.title,
                    subreddit: data.subreddit
                });
                sub.subreddit = data.subreddit;
                sub.type = 'top';
                const found = await Post.findOne({ telegram_id: msg.chat.id, title: data.title, subreddit: data.subreddit });
                if (!found) {
                    await newPost.save();
                }
                helpers(data, msg);
                setTimeout(() => { bot.sendMessage(msg.chat.id, 'Do you like to get post about this subreddit in future', { reply_markup: keyboard.subscribe }) }, 1500)
            } else {
                bot.sendMessage(msg.chat.id, `There is no such sub-reddit as ${msg.text}`);
                bot.sendMessage(msg.chat.id, `Explore More`, { reply_markup: keyboard.startkeyboard });
            }
        }
    })
    const recommend = await RedditSimple.AllSubReddit();
    bot.sendMessage(msg.chat.id, `🔍 Search the sub-reddit to get Top Voted Post. OR choose one from keyboards`, { reply_markup: dynamic(recommend) })
})

module.exports = {
    sub
}