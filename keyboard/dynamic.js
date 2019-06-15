module.exports = {
    dynamic: function dynamic(name) {
        const opts = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: name.map(i => ([{
                text: i
            }]))
        }
        return opts;
    },
    dynamic_inline: function dynamic(name) {
        const opts = {
            inline_keyboard: name.map(i => ([{
                text: i,
                callback_data: i
            }]))
        }
        return opts;
    },
    spy: function spy(name) {
        const opts = {
            inline_keyboard: [
                [
                    {
                        text: `👀 Keep eye on ${name}`,
                        callback_data: 'Eye On'
                    },
                    {
                        text: `🙈 Don't keep eye ${name}`,
                        callback_data: 'Key off'
                    }
                ]
            ]
        }
        return opts;
    }
}