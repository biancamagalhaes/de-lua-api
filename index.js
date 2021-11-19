const express = require('express');
const app = express();
const port = 5001;

const dotenv = require('dotenv');
dotenv.config();

app.use('/user', require('./route/user'));
app.use('/psychologist', require('./route/psychologist'));
app.use('/diary', require('./route/diary'));


if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;