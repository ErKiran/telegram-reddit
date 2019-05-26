const { bot } = require('./bot');
const keyboard = require('../keyboard')

bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, `Welcome`, { reply_markup: keyboard.startkeyboard })
})