const createError = require('http-errors');
const winston = require('winston');

module.exports = async function wrapper(res, service, predefinedResponse, next) {
    try {
        const result = await service();
        //throw new Error();
        res.send(predefinedResponse ? predefinedResponse : result);
    } catch (err) {
        winston.error('message: ' + err.message);
        next(createError(404));
    }
};