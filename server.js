const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const featuresRoute = require('./routes/features');
const loginRoute = require('./routes/login');

mongoose.connect(config.database);

app.use('/features', bodyParser.json(), featuresRoute);
app.use('/login', bodyParser.json(), loginRoute);

app.get('/', (req, res) => {
    res.send('w3lc0m3 t0 t1t5');
});

app.set('superSecret', config.secret);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});
