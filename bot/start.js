const { bot } = require('./bot');
const keyboard = require('../keyboard');
const User = require('../models/user');
const { sendMessage } = require('./sendMessage');


bot.onText(/\/start/, async msg => {
    const imageRequest = await bot.getUserProfilePhotos(754019213);
    console.log(imageRequest)
    const newUser = new User({
        telegram_id: msg.chat.id,
        first_name: msg.chat.first_name,
        last_name: msg.chat.last_name,
        language_code: msg.from.language_code,
        created: Date.now()
    })
    const check = await User.find({ telegram_id: msg.chat.id });

    if ((check.length == 0)) {
        await newUser.save();
    }
    bot.sendMessage(msg.chat.id, `Welcome`, { reply_markup: keyboard.startkeyboard })
})

bot.onText(/\/text/, async msg => {
    sendMessage(msg.chat.id)
})