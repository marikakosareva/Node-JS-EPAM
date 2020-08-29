const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/users', require('./routers/users'));
app.use('/groups', require('./routers/groups'));

app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});