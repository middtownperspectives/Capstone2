const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const logs = require('./routes/api/logs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDb
mongoose
    .connect(db)
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Is this thing on?'));

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/logs', logs);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('10-4 on 3000'));