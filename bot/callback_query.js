const { bot } = require('./bot');
const { sub } = require('./top');
const { rand } = require('./helper/random_helper');
const { RedditSimple } = require('reddit-simple');
const keyboard = require('../keyboard');
const Sub = require('../models/subscription');
const Random = require('../models/random');
const { lucky_helper, random_helper, post_helpers, addToFav, editToFav, removeFromFav } = require('./helper')

bot.on('callback_query', async query => {
    const chatId = query.from.id;
    const messageId = query.message.message_id;
    switch (query.data) {
        case 'Load More':
            const res = await RedditSimple.RandomPost(rand.subreddit);
            const data = res[0].data;
            console.log(data.permalink)
            const newPost = new Random({
                telegram_id: chatId,
                title: data.title,
                subreddit: data.subreddit,
                created: Date.now(),
                link: `https://www.reddit.com${data.permalink}`
            });
            const found = await Random.find({ telegram_id: chatId, title: data.title, subreddit: data.subreddit });
            if (found.length == 0 || found == 'undefined' || found == null) {
                await newPost.save();
                post_helpers(data, chatId);
                setTimeout(() => { bot.sendMessage(chatId, 'Choose a action', { reply_markup: keyboard.options }) }, 1500);
            }
            else {
                bot.editMessageText('We are all 🏁🏁done here. Check back later for newer post 😉😉', { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard });
            }
            break
        case 'Another Subreddit':
            bot.sendMessage(chatId, `🔍 Get Random posts from Sub-reddits`);
            random_helper();
            break
        case 'No Subscription':
            bot.editMessageText('No worries.Happy Browsing💻', { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard });
            break
        case 'Keep On Subscription':
            bot.sendMessage(chatId, `You will get update whenever top post on ${sub.subreddit} changes`)
            break
        case 'Un Subscribe':
            await Sub.findOneAndDelete({ telegram_id: chatId, subreddit: sub.subreddit });
            bot.sendMessage(chatId, `You have unsubscribed ${sub.subreddit} Subreddit. You won't be notified about top post in this Sub Reddit.`)
            break
        case 'Rewind':
            lucky_helper(chatId)
            break
        case 'Add_To_List':
            addToFav(query, bot)
            break
        case 'Edit_To_List':
            editToFav(query, bot)
            break
        case 'Remove_From_List':
            removeFromFav(query, bot)
            break
        case 'Subscribe':
            const check = await Sub.find({ telegram_id: chatId, subreddit: sub.subreddit });
            if (check.length == 0) {
                const newSub = new Sub({
                    telegram_id: chatId,
                    subreddit: sub.subreddit,
                    type: sub.type,
                    created: Date.now()
                })
                await newSub.save();
                bot.editMessageText(`Thank you for subscribing us. We will be sending for message from subreddit <b>${sub.subreddit}</b> whenever the <b>${sub.type}</b> post changes`, { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard, parse_mode: 'HTML' });
            } else {
                bot.editMessageText(`You have already Subscribed <b>${sub.subreddit}</b>.We will be sending for message from subreddit <b>${sub.subreddit}</b> whenever the <b>${sub.type}</b> post changes`, { chat_id: chatId, message_id: messageId, reply_markup: keyboard.empty_keyboard, parse_mode: 'HTML' });
            }
    }
})