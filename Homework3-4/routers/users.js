const { v4: uuidv4 } = require('uuid');
const Joi = require('@hapi/joi');
const { getUserById, 
    createUser, 
    updateUser, 
    getAutoSuggestUsers, 
    deleteUser, 
    getUsers, 
    addUsersToGroup } = require('./../services/users');
const db = require('./../data-access/db');
const express = require('express');
const router = express.Router();
const { debug } = require('./../logger');
const winston = require('winston');

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

router.get('/', function (req, res) {
    debug('getUsers');
    getUsers()
        .then(user => res.send(user))
        .catch(err => {
            winston.error('method: getUsers', 'message: ' + err.message);
            res.status(404).send();
        });
});

router.get('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        debug('getUserById' + ' ' + _id);
        getUserById(_id)
            .then(user => res.send(user))
            .catch(err => {
                winston.error('method: getUserById', 'arguments: ' + _id, 'message: ' + err.message);
                res.status(404).send();
            }) 
    } catch {
        res.status(500).send();
    }
});

router.post('/', function (req, res) {
    try {
        const userData = req.body;
        const id = uuidv4();
        const user = { ...userData, id }
        const validationResult = schema.validate(user);
        if (validationResult.error) {
            res.status(400).send({ error: validationResult.error.details });
        } else {
            debug('createUser' + ' ' + JSON.stringify(user));
            createUser({ ...user })
                .then(user => res.send(user))
                .catch(err => {
                    winston.error('method: createUser', 'arguments: ' + JSON.stringify(user), 'message: ' + err.message);
                });
        }
    } catch {
        res.status(500).send();
    }
});

router.post('/group', function (req, res) {
    try {
        const { user_ids, group_id } = req.body;
        debug('addUsersToGroupr' + ' ' + group_id + ' ' + user_ids);
        addUsersToGroup(group_id, user_ids)
            .then(result => res.send(result))
            .catch(err => {
                winston.error('method: addUsersToGroup', 'arguments: ' + JSON.stringify({group_id, user_ids}), 'message: ' + err.message);
            });
    } catch {
        res.status(500).send();
    }
});

router.patch('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        const userData = req.body;
        debug('updateUser' + ' ' + _id + ' ' + JSON.stringify(userData));
        updateUser(_id, userData)
            .then(user => res.send(user))
            .catch(err => {
                winston.error('method: updateUser', 'arguments: ' + JSON.stringify({_id, ...userData}), 'message: ' + err.message);
                res.status(404).send();
            });
    } catch {
        res.status(500).send();
    }
});

router.get('/', function (req, res) {
    try {
        const _limit = req.query.limit;
        const _suggest = req.query.suggest;
        debug('getAutoSuggestUsers' + ' ' + _suggest + ' ' + _limit);
        getAutoSuggestUsers(_suggest, _limit)
            .then(users => res.send(users))
            .catch(err => {
                winston.error('method: getAutoSuggestUsers', 'arguments: ' + JSON.stringify({_suggest, _limit}), 'message: ' + err.message);
                res.status(404).send();
            }) 
    } catch {
        res.status(500).send();
    }
});

router.delete('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        debug('deleteUser' + ' ' + _id);
        deleteUser(_id)
            .then(user => res.send({ id: _id }))
            .catch(err => {
                winston.error('method: deleteUser', 'arguments: ' + _id, 'message: ' + err.message);
            });
    } catch {
        res.status(500).send();
    }
});

module.exports = router;