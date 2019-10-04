const Fav = require('../../models/favourite');
const keyboard = require('../../keyboard')
module.exports = {
    addToFav: async function (msg, bot) {
        const chatId = msg.from.id;
        const messageId = msg.message.message_id;
        bot.editMessageText('Enter the name of Sub-Reddit You want to add to your favorite', { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard });
        bot.once('message', async msg => {
            const checkForCommas = msg.text.includes(',');
            if (checkForCommas) {
                const segments = msg.text.split(',');
                const fav = {
                    telegram_id: chatId,
                    subreddit: segments
                }
                const add = await new Fav(fav).save();
                if (add.subreddit.length !== 0) {
                    bot.sendMessage(chatId, `${msg.text} has been added to the Favoite List`)
                }
            }
            else {
                const fav = {
                    telegram_id: chatId,
                    subreddit: msg.text
                }
                const add = await new Fav(fav).save();
                if (add.subreddit.length !== 0) {
                    bot.sendMessage(chatId, `${msg.text} has been added to the Favoite List`)
                }
            }
        })

    }
}