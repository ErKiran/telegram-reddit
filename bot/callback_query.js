const { bot } = require('./bot');
const { sub } = require('./top');
const keyboard = require('../keyboard');
const Sub = require('../models/subscription');

bot.on('callback_query', async query => {
    const chatId = query.from.id;
    const messageId = query.message.message_id;
    switch (query.data) {
        case 'Load More':
            break
        case 'No Subscription':
            bot.editMessageText('No worries.Happy Browsing💻', { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard });
            break
        case 'Subscribe':
            const check = await Sub.find({ telegram_id: chatId, subreddit: sub.subreddit });
            if (check.length == 0) {
                const newSub = new Sub({
                    telegram_id: chatId,
                    subreddit: sub.subreddit,
                    type: sub.type
                })
                await newSub.save();
                bot.editMessageText(`Thank you for subscribing us. We will be sending for message from subreddit <b>${sub.subreddit}</b> whenever the <b>${sub.type}</b> post changes`, { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard, parse_mode: 'HTML' });
            } else {
                bot.editMessageText(`You have already Subscribed <b>${sub.subreddit}</b>.We will be sending for message from subreddit <b>${sub.subreddit}</b> whenever the <b>${sub.type}</b> post changes`, { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard, parse_mode: 'HTML' });
            }
    }
})