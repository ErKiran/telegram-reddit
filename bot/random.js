const { bot } = require('./bot');
const { RedditSimple } = require('reddit-simple');
const { dynamic } = require('../keyboard/dynamic');
const Fav = require('../models/favourite');
const { random_helper } = require('./helper');


bot.onText(/\/random/, async msg => {
    const recommend = await RedditSimple.AllSubReddit();
    random_helper();
    const FavList = await Fav.find({ telegram_id: msg.chat.id });
    FavList.length === 0 ? sendRecommended(msg) : sendFavourite(msg);
    function sendRecommended(msg) {
        bot.sendMessage(msg.chat.id, `🔍 Get Random posts from Sub-reddits`, { reply_markup: dynamic(recommend) })
    }
    function sendFavourite(msg) {
        bot.sendMessage(msg.chat.id, `🔍 Get Random posts from Sub-reddits`, { reply_markup: dynamic(FavList[0].subreddit.map(i => `${i}\n`)) })
    }
})

bot.onText(/\/sub/, async msg => {
    const res = await api.test();
    console.log(res)
})