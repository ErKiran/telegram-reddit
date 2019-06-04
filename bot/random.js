const { bot } = require('./bot');
const { RedditSimple } = require('reddit-simple');
const { dynamic } = require('../keyboard/dynamic');
const { random_helper } = require('./helper');


bot.onText(/\/random/, async msg => {
    const recommend = await RedditSimple.AllSubReddit();
    random_helper();
    bot.sendMessage(msg.chat.id, `🔍 Get Random posts from Sub-reddits`, { reply_markup: dynamic(recommend) })
})

bot.onText(/\/sub/, async msg => {
    const res = await api.test();
    console.log(res)
})