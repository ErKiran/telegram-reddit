const { bot } = require('./bot');
const { RedditSimple } = require('reddit-simple');
const { helpers } = require('./post_helper');

bot.onText(/\/feeling_lucky/, async msg => {
    const subs = await RedditSimple.SubReddit();
    const res = await RedditSimple.RandomPost(subs);
    const data = res[0].data;
    helpers(data, msg);
})