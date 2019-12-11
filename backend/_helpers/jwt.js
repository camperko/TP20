const expressJwt = require('express-jwt');
const config = require('../config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/api/registration',
            '/api/transaction',
            '/api/getAssetDetails',
            '/transaction/types',
            /^\/transaction\/fields\/.*/,
            '/transaction/fields/*'
        ]
    });
}
