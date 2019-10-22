/*const { RedditSimple } = require('reddit-simple');
const { post_helpers } = require('./helper/post_helpers');
const Post = require('../models/subreddit');
const Sub = require('../models/subscription');


(async () => {
    const res = await Sub.find({ type: 'top' });
    res.forEach(async i => {
        const filter = await Post.find({ telegram_id: i.telegram_id, subreddit: i.subreddit }).limit(1).sort({ $natural: -1 });
        let obj1 = {
            title: filter.map(i => i.title)[0],
            subreddit: filter.map(i => i.subreddit)[0]
        };
        const current = await RedditSimple.TopPost(i.subreddit)
        const { title, subreddit } = current[0].data;
        let obj2 = {
            title,
            subreddit
        }
        if (obj1.subreddit === obj2.subreddit) {
            if (obj1.title === obj2.title) {
            }
            else if (obj1.title !== obj2.title) {
                const newdata = await RedditSimple.TopPost(obj1.subreddit);
                const msgtopost = newdata[0].data;
                post_helpers(msgtopost, i.telegram_id);
            }
        }
    })
})()
*/