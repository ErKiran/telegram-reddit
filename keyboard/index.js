module.exports = {
    startkeyboard: {
        resize_keyboard: true,
        one_time_keyboard: true,
        keyboard: [
            ['🔝 /top', '🔀 /random'],
            ['👤/customize'],
            ['🍀 /feeling_lucky', '🕵️ /stalk']
        ]
    },
    customize: {
        inline_keyboard: [
            [{
                text: '➕Add to List',
                callback_data: 'Edit_To_List'
            },
            {
                text: '❌Remove from List',
                callback_data: 'Remove_From_List'
            }
            ]
        ]
    },
    customize_add: {
        inline_keyboard: [
            [{
                text: '➕Add to List',
                callback_data: 'Add_To_List'
            }
            ]
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