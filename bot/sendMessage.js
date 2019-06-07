const { RedditSimple } = require('reddit-simple');
const { bot } = require('./bot');
const Post = require('../models/subreddit');
const Sub = require('../models/subscription');

async function sendMessage(id) {
    const res = await Sub.find({ telegram_id: id, type: 'top' });
    const subscribedSub = res.map(i => i.subreddit);

    subscribedSub.forEach(async i => {
        const filter = await Post.find({ telegram_id: id, subreddit: i });
        let test = [];
        //console.log(filter.filter(i => i.subreddit));
        const rr = await filter.map(i => i.title);
        await test.push(rr);
        console.log(test);
        const current = await RedditSimple.TopPost(i);
        // console.log(current[0].data);
        const { title, subreddit } = current[0].data;
        console.log(title, subreddit);

        // console.log(test);
    })
    return subscribedSub;
}

bot.onText(/\/send/, async msg => {
    const res = await sendMessage(msg.chat.id);
    console.log(res)
})