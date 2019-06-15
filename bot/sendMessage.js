const { RedditSimple } = require('reddit-simple');
const { post_helpers } = require('./helper/post_helpers');
const Post = require('../models/subreddit');
const Sub = require('../models/subscription');


setInterval(() => {
    const res = await Sub.find({ telegram_id: id, type: 'top' });
    const subscribers = res.map(i => i.telegram_id);
    const subscribedSub = res.map(i => i.subreddit);
    subscribedSub.forEach(async i => {
        const filter = await Post.find({ telegram_id: id, subreddit: i }).limit(1).sort({ $natural: -1 });
        let obj1 = {
            title: filter.map(i => i.title)[0],
            subreddit: filter.map(i => i.subreddit)[0]
        };
        const current = await RedditSimple.TopPost(i);
        const { title, subreddit } = current[0].data;
        let obj2 = {
            title,
            subreddit
        }
        if (obj1.subreddit == obj2.subreddit) {
            if (obj1.title == obj2.title) {
            }
            else if (obj1.title !== obj2.title) {
                console.log(obj1)
                const newdata = await RedditSimple.TopPost(obj1.subreddit);
                const msgtopost = newdata[0].data;
                post_helpers(msgtopost, subscribers);
            }
        }
    })

}, 10000)
