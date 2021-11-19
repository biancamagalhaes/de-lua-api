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
    app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});
}

module.exports = app;
