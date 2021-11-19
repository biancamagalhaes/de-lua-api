const express = require('express');
const app = express();
var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.get('/', (req, res) => res.send('Estou Funcionando!'));

app.use('/user', require('./route/user'));
app.use('/psychologist', require('./route/psychologist'));
app.use('/diary', require('./route/diary'));


if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.port || 3000)
}

module.exports = app;
