const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    telegram_id: { type: Number, unique: true },
    first_name: String,
    last_name: String,
    language_code: String,
    created: Date
});

module.exports = User = mongoose.model('user', userSchema)