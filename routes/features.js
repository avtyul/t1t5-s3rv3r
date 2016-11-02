const express = require('express');
const router = express.Router();
const FeatureModel = require('../models/Feature');
const DeviceModel = require('../models/Device');
const jwt = require('jsonwebtoken');

const push = require('../functions/push');

const pushFeatures = () => {
    let dvcs = [];
    DeviceModel.find((error, devices) => {
        if(error) {
            console.log('pushFeatures device error: ', error);
            return;
        }
        dvcs = devices.map((device) => device.registrationId);
        console.log('pushFeatures dvcs: ', dvcs);
    });
    FeatureModel.find((error, features) => {
        if(error) {
            console.log('pushFeatures error: ', error);
            return;
        }
        push(features, dvcs);
    });
}

// Получение всех
router.get('/', (req, res) => {
    FeatureModel.find((error, features) => {
        if(error) {
            console.log('features get / error: ', error);
            res.send('Error');
            return;
        }
        res.json(features);
    });
});

// Добавление нового, по токену
router.post('/', (req, res) => {
    jwt.verify(req.body.token, req.app.get('superSecret'), (error, decoded) => {
        if (error) {
            console.log('features post / token error: ', error);
            res.send('Token error');
            return;
        }
    });
    let data = req.body.data;
    if (!data) {
        console.log('features post / data error');
        res.send('Error');
        return;
    }
    FeatureModel.addFeature(data)
        .then((feature) => {
            res.json({_id: feature._id});
            pushFeatures();
        })
        .catch((error) => {
            console.log('features post / addFeature error: ', error);
            res.send('Error');
        });
});

// Удаление всех, по токену
router.delete('/', (req, res) => {
    jwt.verify(req.body.token, req.app.get('superSecret'), (error, decoded) => {
        if (error) {
            console.log('features delete / token error: ', error);
            res.send('Token error');
            return;
        }
    });
    FeatureModel.remove({}, (error, feature) => {
        if (error) {
            console.log('features delete / remove error: ', error);
            res.send('Error');
            return;
        }
        res.send('200');
        pushFeatures();
    })
});

// Получение конкретного
router.get('/:id', (req, res) => {
    let id = req.params.id;
    FeatureModel.findOne({_id: id}, (error, feature) => {
        if (error || !feature) {
            console.log('features get /:id error: ', error);
            res.send('Error');
            return;
        }
        res.json(feature);
    });
});

// Изменение конкретного, по токену
router.put('/:id', (req, res) => {
    jwt.verify(req.body.token, req.app.get('superSecret'), (error, decoded) => {
        if (error) {
            console.log('features put /:id token error: ', error);
            res.send('Token error');
            return;
        }
    });
    let id = req.params.id;
    let data = req.body.data;
    if (!data) {
        console.log('features put /:id data error');
        res.send('Error');
        return;
    }
    FeatureModel.changeFeature(data)
        .then((feature) => {
            res.json({_id: feature._id});
            pushFeatures();
        })
        .catch((error) => {
            console.log('features put /:id changeFeature error: ', error);
            res.send('Error');
        });
});

// Удаление конкретного, по токену
router.delete('/:id', (req, res) => {
    jwt.verify(req.body.token, req.app.get('superSecret'), (error, decoded) => {
        if (error) {
            console.log('features delete /:id token error: ', error);
            res.send('Token error');
            return;
        }
    });
    let id = req.params.id;
    FeatureModel.findOne({_id: id}, (error, feature) => {
        if (error || !feature) {
            console.log('features delete /:id findOne error: ', error);
            res.send('Error');
            return;
        }
        feature.removeFeature()
            .then(() => {
                res.send('OK');
                pushFeatures();
            })
            .catch((error) => {
                console.log('features delete /:id removeFeature error: ', error);
                res.send('Error');
            });
    });
});

module.exports = router;
