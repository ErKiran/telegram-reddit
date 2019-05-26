const { bot } = require('./bot');
const { RedditWrapper } = require('reddit-simple');
const keyboard = require('../keyboard');


bot.onText(/\/top/, async msg => {
    bot.once('message', async msg => {
        if (msg.text) {
            const res = await RedditWrapper.TopPost(msg.text);
            if (!(res.length) == 0) {
                const data = res[0].data;
                if (data.post_hint == 'image') {
                    bot.sendMessage(msg.chat.id, `${data.title} \n 
                from:<b>${data.subreddit_name_prefixed}</b>
                `, { parse_mode: 'HTML' });
                    bot.sendPhoto(msg.chat.id, data.url);
                }
                if (data.post_hint == 'rich:video') {
                    bot.sendMessage(msg.chat.id, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' });
                    bot.sendVideo(msg.chat.id, data.media.oembed.thumbnail_url);
                }
                if (data.post_hint == 'hosted:video') {
                    bot.sendMessage(msg.chat.id, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' })
                    bot.sendVideo(msg.chat.id, data.media.reddit_video.fallback_url, {
                        duration: data.media.duration,
                        height: data.media.height,
                        width: data.media.width
                    });
                }
                if (data.post_hint == 'link') {
                    bot.sendMessage(msg.chat.id, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' });
                    bot.sendMessage(msg.chat.id, data.url)
                }
                if (data.post_hint == undefined) {
                    bot.sendMessage(msg.chat.id, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' });
                    if (data.url) {
                        if (data.domain == 'i.redd.it')
                            bot.sendPhoto(msg.chat.id, data.url)
                    }
                    bot.sendMessage(msg.chat.id, data.url)
                }
                if (data.post_hint == 'self') {
                    bot.sendMessage(msg.chat.id, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' });
                    if (data.url) {
                        if (data.domain == 'i.redd.it')
                            bot.sendPhoto(msg.chat.id, data.url)
                    }
                    bot.sendMessage(msg.chat.id, `Follow Discussion on \n ${data.url}`)
                }
            } else {
                bot.sendMessage(msg.chat.id, `There is no such sub-reddit as ${msg.text}`);
                bot.sendMessage(msg.chat.id, `Explore More`, { reply_markup: keyboard.startkeyboard });
            }
        }
    })
    const recommend = await RedditWrapper.SubReddit();
    bot.sendMessage(msg.chat.id, `🔍 Search the sub-reddit to get Top Voted Post. Try ${recommend}`)
})