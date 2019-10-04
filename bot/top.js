const { bot } = require('./bot');
const { RedditSimple } = require('reddit-simple');
const Post = require('../models/subreddit');
const Fav = require('../models/favourite');
const keyboard = require('../keyboard');
const { dynamic } = require('../keyboard/dynamic');
const { post_helpers } = require('./helper')
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
                    subreddit: data.subreddit,
                    inserted: Date.now()
                });
                sub.subreddit = data.subreddit;
                sub.type = 'top';
                const found = await Post.findOne({ telegram_id: msg.chat.id, title: data.title, subreddit: data.subreddit });
                if (!found) {
                    await newPost.save();
                }
                post_helpers(data, msg.chat.id);
                setTimeout(() => { bot.sendMessage(msg.chat.id, 'Do you like to get post about this subreddit in future', { reply_markup: keyboard.subscribe }) }, 1500)
            } else {
                bot.sendMessage(msg.chat.id, `There is no such sub-reddit as ${msg.text}`);
                bot.sendMessage(msg.chat.id, `Explore More`, { reply_markup: keyboard.startkeyboard });
            }
        }
    })
    const recommend = await RedditSimple.AllSubReddit();
    const FavList = await Fav.find({ telegram_id: msg.chat.id });
    FavList.length === 0 ? sendRecommended(msg) : sendFavourite(msg);
    function sendRecommended(msg) {
        bot.sendMessage(msg.chat.id, `🔍 Search the sub-reddit to get Top Voted Post. OR choose one from keyboards`, { reply_markup: dynamic(recommend) })
    }
    function sendFavourite(msg) {
        bot.sendMessage(msg.chat.id, `🔍 Search the sub-reddit to get Top Voted Post. OR choose one from keyboards`, { reply_markup: dynamic(FavList[0].subreddit.map(i => `${i}\n`)) })
    }
})

module.exports = {
    sub
}