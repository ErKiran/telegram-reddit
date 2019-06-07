module.exports = {
    startkeyboard: {
        resize_keyboard: true,
        one_time_keyboard: true,
        keyboard: [
            ['🔝 /top', '🔀 /random'],
            ['🍀 /feeling_lucky', '🕵️ /stalk']
        ]
    },
    empty_keyboard: {
        inline_keyboard: []
    },
    subscribe: {
        inline_keyboard: [
            [
                {
                    text: '🔔 Subscribe',
                    callback_data: 'Subscribe'
                },
                {
                    text: `🔕Don't Subscribe `,
                    callback_data: 'No Subscription'
                }
            ]
        ]
    },
    options: {
        inline_keyboard: [
            [
                {
                    text: '⌛Load More',
                    callback_data: 'Load More'
                },
                {
                    text: '🌀Another Sub-reddit',
                    callback_data: 'Another Subreddit'
                }
            ]
        ]
    },
    rewind: {
        inline_keyboard: [
            [
                {
                    text: '🎁 Unbox',
                    callback_data: 'Rewind'
                }
            ]
        ]
    }
}    