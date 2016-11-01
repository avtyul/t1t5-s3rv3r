const express = require('express');
const router = express.Router();
const FeatureModel = require('../models/Feature');

// Получение всех
router.get('/', (req, res) => {
    FeatureModel.find((error, features) => {
        if(error) {
            res.send('500');
            return;
        }
        res.send(JSON.stringify(features));
    });
});

// Добавление нового
router.post('/', (req, res) => {
    let data = req.body;
    if (!data) {
        res.send('404');
        return;
    }
    FeatureModel.addFeature(data)
        .then((feature) => {
            res.send(JSON.stringify({_id: feature._id}));
        })
        .catch((error) => {
            console.log(error);
            res.send('500');
        });
});

// Удаление всех
router.delete('/', (req, res) => {
    FeatureModel.remove({}, (error, feature) => {
        if (error) {
            res.send('500');
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
            res.send('404');
            return;
        }
        res.send(JSON.stringify(feature));
    });
});

// Изменение конкретного
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    if (!data) {
        res.send('404');
        return;
    }
    FeatureModel.changeFeature(data)
        .then((feature) => {
            res.send(JSON.stringify({_id: feature._id}));
        })
        .catch((error) => {
            console.log(error);
            res.send('500');
        });
});

// Удаление конкретного
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    FeatureModel.findOne({_id: id}, (error, feature) => {
        if (error || !feature) {
            res.send('404');
            return;
        }
        feature.removeFeature()
            .then(() => {
                res.send('200 OK');
            })
            .catch((error) => {
                console.log(error);
                res.send('500');
            });
    });
});

module.exports = router;
