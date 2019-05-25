process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api');
const config = require('../config/config')

const bot = new TelegramBot(config.TOKEN, {
    polling: true,
    onlyFirstMatch: true
});

module.exports = {
    bot
}