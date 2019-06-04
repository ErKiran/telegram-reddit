const { bot } = require('./bot');
const { RedditSimple } = require('reddit-simple');
const Random = require('../models/random');
const { dynamic } = require('../keyboard/dynamic');
const keyboard = require('../keyboard/index');
const { helpers } = require('./post_helper');

bot.onText(/\/random/, async msg => {
    bot.once('message', async msg => {
        if (msg.text) {
            const res = await RedditSimple.RandomPost(msg.text);
            const db = new Random({ res });
            db.save()
            if (!(res.length) == 0) {
                const data = res[0].data;
                helpers(data, msg)
            } else {
                bot.sendMessage(msg.chat.id, `There is no such sub-reddit as ${msg.text}`)
            }
            setTimeout(() => { bot.sendMessage(msg.chat.id, 'Choose a action', { reply_markup: keyboard.options }) }, 1500)
        }
    })
    const recommend = await RedditSimple.AllSubReddit();
    bot.sendMessage(msg.chat.id, `🔍 Get Random posts from Sub-reddits`, { reply_markup: dynamic(recommend) })
})

bot.onText(/\/sub/, async msg => {
    const res = await api.test();
    console.log(res)
})