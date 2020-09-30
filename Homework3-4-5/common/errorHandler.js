const winston = require('winston');
module.exports = function(err, res) {
    winston.error((new Date).toUTCString() + 'expressUncaughtException:', err.message);
    if (err.status) res.status(err.status).send(err.message);
    res.status(500).send('Something broke!');
}