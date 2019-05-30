const { bot } = require('./bot');
const { RedditSimple } = require('reddit-simple');
const Post = require('../models/subreddit');
const keyboard = require('../keyboard');
const { dynamic } = require('../keyboard/dynamic');
const  sub = {};


bot.onText(/\/top/, async msg => {
    bot.once('message', async msg => {
        if (msg.text) {
            const res = await RedditSimple.TopPost(msg.text);
            if (!(res.length) == 0) {
                const data = res[0].data;
                const newPost = new Post({
                    telegram_id: msg.chat.id,
                    title: data.title,
                    subreddit: data.subreddit
                });
                sub.subreddit = data.subreddit;
                const found = await Post.findOne({ telegram_id: msg.chat.id, title: data.title, subreddit: data.subreddit });
                if (!found) {
                    await newPost.save();
                }
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
                setTimeout(() => { bot.sendMessage(msg.chat.id, 'Do you like to get post about this subreddit in future', { reply_markup: keyboard.subscribe }) }, 1500)
            } else {
                bot.sendMessage(msg.chat.id, `There is no such sub-reddit as ${msg.text}`);
                bot.sendMessage(msg.chat.id, `Explore More`, { reply_markup: keyboard.startkeyboard });
            }
        }
    })
    const recommend = await RedditSimple.AllSubReddit();
    bot.sendMessage(msg.chat.id, `🔍 Search the sub-reddit to get Top Voted Post. OR choose one from keyboards`, { reply_markup: dynamic(recommend) })
})