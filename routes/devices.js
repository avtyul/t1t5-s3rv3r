const express = require('express');
const router = express.Router();
const DeviceModel = require('../models/Device');

const checkToken = require('../functions/checkToken');

// Получение всех
router.get('/', (req, res) => {
    DeviceModel.findDevices()
        .then((devices) => {
            devices = devices.map((device) => { return {deviceName: device.deviceName, deviceId: device.deviceId, registrationId: device.registrationId} });
            res.status(200).json(devices);
        })
        .catch((error) => {
            console.log('devices get / error: ', error);
            res.status(500).json({error});
        });
});

// Добавление нового, по токену
router.post('/', (req, res) => {
    checkToken(req.body.token, req.app.get('superSecret'))
        .then((decoded) => {
            let data = {
                deviceName: req.body.deviceName,
                deviceId: req.body.deviceId,
                registrationId: req.body.registrationId
            };
            if (!data.deviceName || !data.deviceId || !data.registrationId) {
                console.log('devices post / data error');
                res.status(400).json({error: 'missing some data'});
                return;
            }
            DeviceModel.addDevice(data)
                .then((device) => {
                    console.log('device: ', device);
                    res.status(200).json({registrationId: device.registrationId});
                })
                .catch((error) => {
                    console.log('devices post / addDevice error: ', error);
                    res.status(500).json({error});
                });
        })
        .catch((error) => {
            console.log('devices post / token error: ', error);
            res.status(403).json({error});
        });
});

// Получение конкретного
router.get('/:registrationId', (req, res) => {
    let registrationId = req.params.registrationId;
    DeviceModel.findOneDevice(registrationId)
        .then((device) => {
            if (!device) {
                console.log('devices get /:registrationId error: ', error);
                res.status(400).json({error: 'no such device'});
                return;
            }
            device = {
                deviceName: device.deviceName,
                deviceId: device.deviceId,
                registrationId: device.registrationId
            };
            res.status(200).json(device);
        })
        .catch((error) => {
            console.log('devices get /:registrationId error: ', error);
            res.status(500).json({error});
        });
});

// Удаление конкретного, по токену
router.delete('/:registrationId', (req, res) => {
    checkToken(req.body.token, req.app.get('superSecret'))
        .then((decoded) => {
            let registrationId = req.params.registrationId;
            DeviceModel.findOneDevice(registrationId)
                .then((device) => {
                    if (!device) {
                        console.log('devices delete /:registrationId findOne error: ', error);
                        res.status(400).json({error: 'no such device'});
                        return;
                    }
                    device.removeDevice()
                        .then(() => {
                            res.status(200).json({message: 'OK'});
                        })
                        .catch((error) => {
                            console.log('devices delete /:registrationId removeDevice error: ', error);
                            res.status(500).json({error});
                        });
                })
                .catch((error) => {
                    console.log('devices delete /:registrationId findOneDevice error: ', error);
                    res.status(500).json({error});
                });
        })
        .catch((error) => {
            console.log('devices delete /:registrationId token error: ', error);
            res.status(403).json({error});
        });
});

module.exports = router;
