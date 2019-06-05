const mongoose = require('mongoose');
const { Mongo } = require('./config/config');
const Random = require('./models/random');


process.setMaxListeners(0);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(Mongo, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



require('./bot/top');
require('./bot/random');
require('./bot/start');
require('./bot/feeling_lucky');
require('./bot/stalkuser');
require('./bot/callback_query');