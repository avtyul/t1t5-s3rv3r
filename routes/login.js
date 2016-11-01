const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    let data = req.body;
    if (!data) {
        res.send('Error');
        return;
    }
    UserModel.findOne({login: data.login, password: data.password}, (error, user) => {
        if (error || !user) {
            res.send('Error');
            return;
        }
        const token = jwt.sign(user, req.app.get('superSecret'), {
          expiresIn: "1 day"
        });
        res.json({token: token});
    });
});

module.exports = router;
