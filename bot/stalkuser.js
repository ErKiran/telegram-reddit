const { bot } = require('./bot');
const { RedditSimple } = require('reddit-simple')
const { spy } = require('../keyboard/dynamic');

bot.onText(/\/stalk/, async msg => {
    bot.once('message', async msg => {
        if (msg.text) {
            const res = await RedditSimple.SpyRedditor(msg.text);
            if (!(res.length == 0)) {
                res.map(i => {
                    bot.sendMessage(msg.chat.id, `${i.body}\n ${i.link_permalink}`)
                })
                setTimeout(() => bot.sendMessage(msg.chat.id, 'What would you like to do?', { reply_markup: spy(msg.text) }), 5000)

            }
            else {
                bot.sendMessage(msg.chat.id, `😞 We couldn't find the any redditors with username ${msg.text}`);
                bot.sendMessage(msg.chat.id, `Explore More`, { reply_markup: keyboard.startkeyboard });
            }
        }
    })
    bot.sendMessage(msg.chat.id, `🕵️Spy on the redditor. Just give a name🕵️`)
})
