const mongoose = require('mongoose');
const http = require('http');
const { MLAB } = require('./config/key');
const { logger } = require('./logs')


process.setMaxListeners(0);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(MLAB, { useNewUrlParser: true })
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error(err));

require('./bot/top');
require('./bot/random');
require('./bot/start');
require('./bot/feeling_lucky');
require('./bot/stalkuser');
require('./bot/callback_query');
require('./bot/sendMessage');
require('./bot/subs');
require('./bot/customize');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
}).listen(process.env.PORT || 5000);
