const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors'); //allows other servers to talk to my server
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const logs = require('./routes/api/logs');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', //frontend server
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDb
mongoose
    .connect(db)
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/logs', logs);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log('10-4 on 8000'));