const mongoose = require('mongoose');
const http = require('http');
const { MLAB } = require('./config/key');


process.setMaxListeners(0);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(MLAB, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    require('./bot/top');
    require('./bot/random');
    require('./bot/start');
    require('./bot/feeling_lucky');
    require('./bot/stalkuser');
    require('./bot/callback_query');
    require('./bot/sendMessage');
    res.end();
}).listen(process.env.PORT || 5000);
