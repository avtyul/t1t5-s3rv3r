const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    let data = {
        login: req.body.login,
        password: req.body.password
    };
    if (!data.login || !data.password) {
        console.log('login post / data error');
        res.status(400).json({'error': 'missing login or data'});
        return;
    }
    UserModel.findOneUser(data.login, data.password)
        .then((user) => {
            if (!user) {
                console.log('login post / findOneUser error: !user');
                res.status(400).json({'error': 'wrong login or password'});
                return;
            }
            const token = jwt.sign(user, req.app.get('superSecret'), {
                expiresIn: "1 h"
            });
            res.status(200).json({token});
        })
        .catch((error) => {
            console.log('login post / findOneUser error: ', error);
            res.status(500).json({error});
        });
});

module.exports = router;
