const { bot } = require('./bot');
const keyboard = require('../keyboard');
const User = require('../models/user');

bot.onText(/\/start/, async msg => {
    const newUser = new User({
        telegram_id: msg.chat.id,
        first_name: msg.chat.first_name,
        last_name: msg.chat.last_name,
        language_code: msg.from.language_code
    })
    const check = await User.find({ telegram_id: msg.chat.id });

    if ((check.length == 0)) {
        await newUser.save();
    }
    bot.sendMessage(msg.chat.id, `Welcome`, { reply_markup: keyboard.startkeyboard })
})