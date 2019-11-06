const Fav = require('../../models/favourite');
const keyboard = require('../../keyboard');
const { logger } = require('../../logs')
module.exports = {
    addToFav: async function (msg, bot) {
        const chatId = msg.from.id;
        const messageId = msg.message.message_id;
        bot.editMessageText(`Enter the name of Sub-Reddit You want to add to your favorite. If you want to add multiple sub-reddits use commas to Seperate Like SubReddit1,SubReddit2,..`, { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard });
        bot.once('message', async msg => {
            try {
                const checkForCommas = msg.text.includes(',');
                if (checkForCommas) {
                    const segments = msg.text.split(',');
                    const fav = {
                        telegram_id: chatId,
                        subreddit: segments,
                        created: Date.now()
                    }
                    const add = await new Fav(fav).save();
                    if (add.subreddit.length !== 0) {
                        bot.sendMessage(chatId, `${msg.text} has been added to the Favoite List`)
                    }
                }
                else {
                    const fav = {
                        telegram_id: chatId,
                        subreddit: msg.text,
                        created: Date.now()
                    }
                    const add = await new Fav(fav).save();
                    if (add.subreddit.length !== 0) {
                        bot.sendMessage(chatId, `${msg.text} has been added to the Favoite List`)
                    }
                }
            }
            catch (e) {
                logger.error(e)
            }
        })

    },
    editToFav: async function editToFav(msg, bot) {
        const chatId = msg.from.id;
        const messageId = msg.message.message_id;
        bot.editMessageText(`Enter the name of Sub-Reddit You want to add to your favorite.If you want to add multiple sub-reddits use commas to Seperate Like SubReddit1,SubReddit2,..`, { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard });
        bot.once('message', async msg => {
            const checkForCommas = msg.text.includes(',');
            if (checkForCommas) {
                const segments = msg.text.split(',');
                await Fav.updateOne({ telegram_id: chatId }, { "$push": { "subreddit": segments } });
                const find = await Fav.find({ telegram_id: chatId });
                if (find[0].subreddit.includes(segments[0])) {
                    bot.sendMessage(chatId, `${msg.text} has been added to favourite list`)
                }
            }
            else {
                await Fav.updateOne({ telegram_id: chatId }, { "$push": { "subreddit": msg.text } });
                const find = await Fav.find({ telegram_id: chatId });
                if (find[0].subreddit.includes(msg.text)) {
                    bot.sendMessage(chatId, `${msg.text} has been added to favourite list`)
                }
            }
        })
    },
    removeFromFav: async function removeFromFav(msg, bot) {
        const chatId = msg.from.id;
        const messageId = msg.message.message_id;
        bot.editMessageText('Enter the name of Sub-Reddit You want to remove from your favorite', { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard });
        bot.once('message', async msg => {
            const checkForCommas = msg.text.includes(',');
            if (checkForCommas) {
                const segments = msg.text.split(',');
                await Fav.updateOne({ telegram_id: chatId }, { "$pull": { "subreddit": segments.map(i => i) } }, { multi: true });
                const find = await Fav.find({ telegram_id: chatId });
                console.log(find)
            }
            else {
                await Fav.updateOne({ telegram_id: chatId }, { "$pull": { "subreddit": msg.text } });
                const find = await Fav.find({ telegram_id: chatId });
                if (find[0].subreddit.length !== 0) {
                    bot.sendMessage(`${msg.text} has been removed from favourite list`)
                }
            }
        })
    }
}