const mongoose = require('mongoose');
const { MLAB } = require('./config/key');


process.setMaxListeners(0);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(MLAB, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



require('./bot/top');
require('./bot/random');
require('./bot/start');
require('./bot/feeling_lucky');
require('./bot/stalkuser');
require('./bot/callback_query');
require('./bot/sendMessage');