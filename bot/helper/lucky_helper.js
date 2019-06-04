const { RedditSimple } = require('reddit-simple');
const keyboard = require('../../keyboard');
const { bot } = require('../bot');
const { post_helpers } = require('./post_helpers');
module.exports = {
    lucky_helper: async function lucky_helper(msg) {
        const subs = await RedditSimple.SubReddit();
        const res = await RedditSimple.RandomPost(subs);
        const data = res[0].data;
        post_helpers(data, msg);
        setTimeout(() => bot.sendMessage(msg, 'Do you like to load more', { reply_markup: keyboard.rewind }), 5000)
    }
}