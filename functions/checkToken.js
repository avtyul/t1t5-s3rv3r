const jwt = require('jsonwebtoken');

function checkToken (token, secret) {
    return new Promise ((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                console.log('check token error: ', error);
                reject(error);
            }
            resolve(decoded);
        });
    });
};

module.exports = checkToken;