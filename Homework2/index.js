const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('@hapi/joi');
const { getUserById, createUser, updateUser, getAutoSuggestUsers, deleteUser, getUsers } = require('./users');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 60;

app.use(express.json());
const schema = Joi.object({
    id: Joi.string()
        .required(),

    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),

    isDeleted: Joi.boolean()
        .required(),
});

app.get('/users', function (req, res) {
    try {

        const _limit = req.query.limit;
        const _suggest = req.query.suggest;

        if (_limit && _suggest) {
            const users = getAutoSuggestUsers(_suggest, _limit);
            if (users && users.length) {
                res.send(users);
            } else {
                res.status(404).send();
            } 
        }

        const users = getUsers();
        if (users) {
            res.send(users);
        } else {
            res.status(404).send();
        } 
    } catch {
        res.status(500).send();
    }
});

app.get('/users/:id', function (req, res) {
    try {
        const _id = req.params.id;
        const user = getUserById(_id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send();
        } 
    } catch {
        res.status(500).send();
    }
});

app.post('/users', function (req, res) {
    try {
        const userData = req.body;
        const id = uuidv4();
        const user = { ...userData, id }
        const validationResult = schema.validate(user);
        if (validationResult.error) {
            res.status(400).send({ error: validationResult.error.details });
        } else {
            createUser({ ...user });
            res.send({ id });
        }
    } catch {
        res.status(500).send();
    }
});

app.patch('/users/:id', function (req, res) {
    try {
        const _id = req.params.id;
        const userData = req.body;
        const newUserData = updateUser(_id, userData);
        if (newUserData) {
            res.send(newUserData);
        } else {
            res.status(404).send();
        } 
    } catch {
        res.status(500).send();
    }
});

app.get('/users', function (req, res) {
    try {
        const _limit = req.query.limit;
        const _suggest = req.query.suggest;
        const users = getAutoSuggestUsers(_suggest, _limit);
        if (users && users.length) {
            res.send(users);
        } else {
            res.status(404).send();
        } 
    } catch {
        res.status(500).send();
    }
});

app.delete('/users/:id', function (req, res) {
    try {
        const _id = req.params.id;
        deleteUser(_id); 
        res.send({ id: _id });
    } catch {
        res.status(500).send();
    }
});

app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});