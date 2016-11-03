const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const featuresRoute = require('./routes/features');
const loginRoute = require('./routes/login');
const devicesRoute = require('./routes/devices');

mongoose.connect(config.database);

app.use('/features', bodyParser.json(), morgan('combined'), featuresRoute);
app.use('/login', bodyParser.json(), morgan('combined'), loginRoute);
app.use('/devices', bodyParser.json(), morgan('combined'), devicesRoute);

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('w3lc0m3 t0 t1t5');
});

app.set('superSecret', config.secret);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});
