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
    }
}