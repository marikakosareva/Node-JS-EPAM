require('dotenv').config();
const express = require('express');
const winston = require('winston');
var cors = require('cors');
const errorHandler = require('./common/errorHandler');
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
app.use(cors());
app.use(express.json());
app.use('/users', require('./routers/users'));
app.use('/groups', require('./routers/groups'));
app.use('/auth', require('./routers/auth'));

app.use((err, req, res, next) => {
    errorHandler(err, res);
});

app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});