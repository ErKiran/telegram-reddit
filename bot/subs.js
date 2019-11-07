const { bot } = require('./bot');
const Sub = require('../models/subscription');
const { dynamic_inline } = require('../keyboard/dynamic');
const { logger } = require('../logs')

bot.onText(/\/mysubs/, async msg => {
    try {
        const res = await Sub.find({ telegram_id: msg.chat.id });
        bot.sendMessage(msg.chat.id, 'Click on the name of Sub-reddit for further actions', { reply_markup: dynamic_inline(res.map(i => i.subreddit)) });
    }
    catch (e) {
        logger.error(e)
    }
})
