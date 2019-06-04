const { bot } = require('./bot');
const { lucky_helper } = require('./helper');


bot.onText(/\/feeling_lucky/, async msg => {
    lucky_helper(msg.chat.id);
})