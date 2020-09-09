const express = require('express');
const winston = require('winston');
process.env['DEBUG'] = 'service';
const PORT = process.env.PORT || 3000;

process.on('uncaughtException',function (err) {
    winston.error((new Date).toUTCString() + 'uncaughtException:', err.message);
    winston.error(err.stack);
    process.exit(1);
  })
process.on('unhandledRejection', function(reason, p){
    winston.error((new Date).toUTCString() + 'unhandledRejection:', err.message);
    winston.error(err.stack);
    process.exit(1);
});  
const app = express();
app.use(express.json());
app.use('/users', require('./routers/users'));
app.use('/groups', require('./routers/groups'));
app.use(function(err, req, res, next) {
    winston.error((new Date).toUTCString() + 'expressUncaughtException:', err.message);
    res.status(500).send('Something broke!');
  });

app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});