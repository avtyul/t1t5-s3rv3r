const express = require('express');
const router = express.Router();
const DeviceModel = require('../models/Device');
const jwt = require('jsonwebtoken');

// Получение всех
router.get('/', (req, res) => {
    DeviceModel.find((error, devices) => {
        if(error) {
            console.log('devices get / error');
            res.send('Error');
            return;
        }
        res.json(devices);
    });
});

// Добавление нового, по токену
router.post('/', (req, res) => {
    jwt.verify(req.body.token, req.app.get('superSecret'), (error, decoded) => {
        if (error) {
            console.log('devices post / token error: ', error);
            res.send('Token error');
            return;
        }
    });
    let data = req.body.data;
    if (!data) {
        console.log('devices post / data error');
        res.send('Error');
        return;
    }
    DeviceModel.addDevice(data)
        .then((device) => {
            console.log('device: ', device);
            res.json({result: "nekhoya", message: "sebe"});
        })
        .catch((error) => {
            console.log('devices post / addDevice error: ', error);
            res.send('Error');
        });
});

// Получение конкретного
router.get('/:id', (req, res) => {
    let id = req.params.id;
    DeviceModel.findOne({_id: id}, (error, device) => {
        if (error || !device) {
            console.log('devices get /:id error: ', error);
            res.send('Error');
            return;
        }
        res.json(device);
    });
});

// Удаление конкретного, по токену
router.delete('/:id', (req, res) => {
    jwt.verify(req.body.token, req.app.get('superSecret'), (error, decoded) => {
        if (error) {
            console.log('devices delete /:id token error: ', error);
            res.send('Token error');
            return;
        }
    });
    let id = req.params.id;
    DeviceModel.findOne({_id: id}, (error, device) => {
        if (error || !device) {
            console.log('devices delete /:id findOne error: ', error);
            res.send('Error');
            return;
        }
        device.removeDevice()
            .then(() => {
                res.send('OK');
            })
            .catch((error) => {
                console.log('devices delete /:id removeDevice error: ', error);
                res.send('Error');
            });
    });
});

module.exports = router;
