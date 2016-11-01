const express = require('express');
const router = express.Router();
const FeatureModel = require('../models/Feature');
const jwt = require('jsonwebtoken');

// Получение всех
router.get('/', (req, res) => {
    FeatureModel.find((error, features) => {
        if(error) {
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
            res.send('Token error');
            return;
        }
    });
    let data = req.body.data;
    if (!data) {
        res.send('Error');
        return;
    }
    FeatureModel.addFeature(data)
        .then((feature) => {
            res.json({_id: feature._id});
        })
        .catch((error) => {
            console.log(error);
            res.send('Error');
        });
});

// Удаление всех, по токену
router.delete('/', (req, res) => {
    jwt.verify(req.body.token, req.app.get('superSecret'), (error, decoded) => {
        if (error) {
            res.send('Token error');
            return;
        }
    });
    FeatureModel.remove({}, (error, feature) => {
        if (error) {
            res.send('Error');
            return;
        }
        res.send('200');
    })
});

// Получение конкретного
router.get('/:id', (req, res) => {
    let id = req.params.id;
    FeatureModel.findOne({_id: id}, (error, feature) => {
        if (error || !feature) {
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
            res.send('Token error');
            return;
        }
    });
    let id = req.params.id;
    let data = req.body.data;
    if (!data) {
        res.send('Error');
        return;
    }
    FeatureModel.changeFeature(data)
        .then((feature) => {
            res.json({_id: feature._id});
        })
        .catch((error) => {
            console.log(error);
            res.send('Error');
        });
});

// Удаление конкретного, по токену
router.delete('/:id', (req, res) => {
    jwt.verify(req.body.token, req.app.get('superSecret'), (error, decoded) => {
        if (error) {
            res.send('Token error');
            return;
        }
    });
    let id = req.params.id;
    FeatureModel.findOne({_id: id}, (error, feature) => {
        if (error || !feature) {
            res.send('Error');
            return;
        }
        feature.removeFeature()
            .then(() => {
                res.send('OK');
            })
            .catch((error) => {
                console.log(error);
                res.send('Error');
            });
    });
});

module.exports = router;
