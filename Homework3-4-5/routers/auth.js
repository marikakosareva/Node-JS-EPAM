const express = require('express');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { getUsers } = require('./../services/users');

const router = express.Router();

router.post('/', async function (req, res, next) {
    const { login, password } = req.body;
    const allUsers = await getUsers(); 
    const user = allUsers.find(item => item.login === login && item.password === password);
    if (user) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, 'secret', {expiresIn: 40});
        res.send(token);
    } else {
        next(createError(403, 'Bad login/password combination!'));
    }
});

module.exports = router;