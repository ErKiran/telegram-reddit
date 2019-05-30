const { bot } = require('./bot');
const { sub } = require('./top')

bot.on('callback_query', async query => {
    const chatId = query.from.id;
    const messageId = query.message.message_id;
    let data;

    switch (query.data) {
        case 'Load More':
            console.log(sub)
            console.log('Yes')
            break
    }
})