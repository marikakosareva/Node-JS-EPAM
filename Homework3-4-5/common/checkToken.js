const jwt = require('jsonwebtoken');
const createError = require('http-errors');
module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'];
    
    if (token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                next(createError(403, 'Forbidden!'));
            } else {
                next();
            }
        })
    } else {
        console.log("lala");
        next(createError(401, 'Unauthorized!'));
    }
}