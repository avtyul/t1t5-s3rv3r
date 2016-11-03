const express = require('express');
const router = express.Router();
const FeatureModel = require('../models/Feature');
const DeviceModel = require('../models/Device');

const config = require('../config');
const push = require('../functions/push');
const checkToken = require('../functions/checkToken');

const pushFeatures = () => {
    if(!config.apiKey) {
        return;
    }
    let dvcs;
    DeviceModel.findDevices()
        .then((devices) => {
            dvcs = devices.map((device) => device.registrationId);
            console.log('pushFeatures devices: ', dvcs);
            FeatureModel.findFeatures()
                .then((features) => {
                    push(features, dvcs);
                })
                .catch((error) => {
                    console.log('pushFeatures error: ', error);
                });
        })
        .catch((error) => {
                console.log('pushFeatures error: ', error);
        });
};

// Получение всех
router.get('/', (req, res) => {
    FeatureModel.findFeatures()
        .then((features) => {
            features = features.map((feature) => {
                return {action: feature.action, type: feature.type, icon: feature.icon}
            });
            res.status(200).json(features);
        })
        .catch((error) => {
            console.log('features get / error: ', error);
            res.status(500).json({error});
        });
});

// Добавление нового, по токену
router.post('/', (req, res) => {
    checkToken(req.body.token, req.app.get('superSecret'))
        .then((decoded) => {
            if (decoded._doc.login === "android") {
                res.status(403).json({error: 'Token error'});
                return;
            }
            let data = {
                action: req.body.data.action,
                type: req.body.data.type,
                icon: req.body.data.icon
            };
            if (!data.action || !data.type || !data.action) {
                console.log('features post / data error');
                res.status(400).json({error: 'missing some data'});
                return;
            }
            FeatureModel.addFeature(data)
                .then((feature) => {
                    res.status(200).json({action: feature.action});
                    pushFeatures();
                })
                .catch((error) => {
                    console.log('features post / addFeature error: ', error);
                    res.status(500).json({error});
                });
        })
        .catch((error) => {
            console.log('features post / token error: ', error);
            res.status(403).json({error});
        });
});

// Удаление всех, по токену
router.delete('/', (req, res) => {
    checkToken(req.body.token, req.app.get('superSecret'))
        .then((decoded) => {
            if (decoded._doc.login === "android") {
                res.status(403).json({error: 'Token error'});
                return;
            }
            FeatureModel.removeFeatures()
                .then((features) => {
                    res.status(200).json({message: 'OK'});
                    pushFeatures();
                })
                .catch((error) => {
                    console.log('features delete / remove error: ', error);
                    res.status(500).json({error});
                });
        })
        .catch((error) => {
            console.log('features delete / token error: ', error);
            res.status(403).json({error});
        });
});

// Получение конкретного
router.get('/:action', (req, res) => {
    let action = req.params.action;
    FeatureModel.findOneFeature(action)
        .then((feature) => {
            if (!feature) {
                console.log('features get /:action error: ', error);
                res.status(400).json({error: 'no such feature'});
                return;
            }
            feature = {
                action: feature.action,
                type: feature.type,
                icon: feature.icon
            };
            res.status(200).json(feature);
        })
        .catch((error) => {
            console.log('features get /:action error: ', error);
            res.status(500).json({error});
        });
});

// Изменение конкретного, по токену
router.put('/:action', (req, res) => {
    checkToken(req.body.token, req.app.get('superSecret'))
        .then((decoded) => {
            if (decoded._doc.login === "android") {
                res.status(403).json({error: 'Token error'});
                return;
            }
            let action = req.params.action;
            let data = {
                action: req.body.data.action,
                type: req.body.data.type,
                icon: req.body.data.icon
            };
            if (!data.action && !data.type && !data.action) {
                console.log('features put /:action data error');
                res.status(400).json({error: 'missing data'});
                return;
            }
            FeatureModel.changeFeature(data, action)
                .then((feature) => {
                    res.status(200).json({action: feature.action});
                    pushFeatures();
                })
                .catch((error) => {
                    console.log('features put /:action changeFeature error: ', error);
                    res.status(500).json({error});
                });
        })
        .catch((error) => {
            console.log('features put /:action token error: ', error);
            res.status(403).json({error});
        });
});

// Удаление конкретного, по токену
router.delete('/:action', (req, res) => {
    checkToken(req.body.token, req.app.get('superSecret'))
        .then((decoded) => {
            if (decoded._doc.login === "android") {
                res.status(403).json({error: 'Token error'});
                return;
            }
            let action = req.params.action;
            FeatureModel.findOneFeature(action)
                .then((feature) => {
                    if (!feature) {
                        console.log('features delete /:action findOne error: ', error);
                        res.status(400).json({error: 'no such feature'});
                        return;
                    }
                    feature.removeFeature()
                        .then(() => {
                            res.status(200).json({message: 'OK'});
                            pushFeatures();
                        })
                        .catch((error) => {
                            console.log('features delete /:action removeFeature error: ', error);
                            res.status(500).json({error});
                        });
                })
                .catch((error) => {
                    console.log('features delete /:action findOneFeature error: ', error);
                    res.status(500).json({error});
                });
        })
        .catch((error) => {
            console.log('features delete /:action token error: ', error);
            res.status(403).json({error});
        });
});

module.exports = router;
