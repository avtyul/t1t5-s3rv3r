const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const featuresRoute = require('./routes/features')

mongoose.connect('mongodb://localhost/t1t5');

app.use('/features', bodyParser.json(), featuresRoute);

app.get('/', (req, res) => {
    res.send('w3lc0m3 t0 t1t5');
});

app.listen(process.env.PORT || 5000, () => {
	console.log(`Server started on port ${process.env.PORT || 5000}`);
});
