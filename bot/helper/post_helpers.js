const { bot } = require('../bot');
function posturl(msg, data) {
    bot.sendMessage(msg, `https://www.reddit.com${data.permalink}`, { disable_web_page_preview: true })
}

module.exports = {
    post_helpers: function helpers(data, msg) {
        if (data.post_hint == 'image') {
            bot.sendMessage(msg, `${data.title} \n 
from:<b>${data.subreddit_name_prefixed}</b>
`, { parse_mode: 'HTML' });
            bot.sendPhoto(msg, data.url);
            posturl(msg, data);
        }
        if (data.post_hint == 'rich:video') {
            bot.sendMessage(msg, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' });
            bot.sendVideo(msg, data.media.oembed.thumbnail_url);
            posturl(msg, data)
        }
        if (data.post_hint == 'hosted:video') {
            bot.sendMessage(msg, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' })
            bot.sendVideo(msg, data.media.reddit_video.fallback_url, {
                duration: data.media.duration,
                height: data.media.height,
                width: data.media.width
            });
            posturl(msg, data)
        }
        if (data.post_hint == 'link') {
            bot.sendMessage(msg, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' });
            bot.sendMessage(msg, data.url)
        }
        if (data.post_hint == undefined) {
            bot.sendMessage(msg, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' });
            if (data.url) {
                if (data.domain == 'i.redd.it')
                    bot.sendPhoto(msg, data.url)
            }
            bot.sendMessage(msg, data.url)
        }
        if (data.post_hint == 'self') {
            bot.sendMessage(msg, `${data.title} \n from:<b>${data.subreddit_name_prefixed}</b>`, { parse_mode: 'HTML' });
            if (data.url) {
                if (data.domain == 'i.redd.it')
                    bot.sendPhoto(msg, data.url);
            }
            bot.sendMessage(msg, `Follow Discussion on \n ${data.url}`)
        }
    }
}