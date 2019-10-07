const { bot } = require('./bot');
const Fav = require('../models/favourite');
const { customize, customize_add } = require('../keyboard');
const { dynamic } = require('../keyboard/dynamic');



bot.onText(/\/customize/, async msg => {
    const FavoriteList = await Fav.find({ telegram_id: msg.chat.id });
    FavoriteList.length === 0 ? EmptyFav(msg) : FavExists(msg);
    function EmptyFav(msg) {
        bot.sendMessage(msg.chat.id, `You don't have any Favourite Sub Reddit. Please add some`, { reply_markup: customize_add })
    }
    function FavExists(msg) {
        bot.sendMessage(msg.chat.id, 'Your favourite list', { reply_markup: dynamic(FavoriteList[0].subreddit.map(i => `${i}\n`)) });
        bot.sendMessage(msg.chat.id, 'Add or Remove favourite from List', { reply_markup: customize })
    }
})

