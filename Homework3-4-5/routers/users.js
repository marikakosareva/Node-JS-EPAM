const { v4: uuidv4 } = require('uuid');
const Joi = require('@hapi/joi');
const createError = require('http-errors');
const express = require('express');
const winston = require('winston');
const { getUserById, 
    createUser, 
    updateUser, 
    getAutoSuggestUsers, 
    deleteUser, 
    getUsers, 
    addUsersToGroup } = require('./../services/users');
const db = require('./../data-access/db');
const { debug } = require('./../logger');
const { validateUser } = require('../validation/users');
const wrapper = require('../common/wrapper');
const checkToken = require('../common/checkToken');
const router = express.Router();

router.get('/:id', checkToken, function (req, res, next) {
    const { id } = req.params;
    debug('getUserById' + ' ' + id);
    wrapper(res, () => getUserById(id), undefined, next);
});

router.post('/', checkToken, function (req, res, next) {
    const userData = req.body;
    const id = uuidv4();
    const user = { ...userData, id }
    validateUser(user, "create");
    debug('createUser' + ' ' + JSON.stringify(user));
    wrapper(res, () => createUser({ ...user }), undefined, next);
});

router.post('/group', checkToken, function (req, res, next) {
    const { user_ids, group_id } = req.body;
    debug('addUsersToGroupr' + ' ' + group_id + ' ' + user_ids);
    wrapper(res, () => addUsersToGroup(group_id, user_ids), undefined, next);
});

router.patch('/:id', checkToken, function (req, res, next) {
    const { id } = req.params;
    const userData = req.body;
    validateUser(userData, "update");
    debug('updateUser' + ' ' + id + ' ' + JSON.stringify(userData));
    wrapper(res, () => updateUser(id, userData), undefined, next);
});

// router.get('/', checkToken, function (req, res) {
//     const _limit = req.query.limit;
//     const _suggest = req.query.suggest;
//     debug('getAutoSuggestUsers' + ' ' + _suggest + ' ' + _limit);
//     wrapper(res, () => getAutoSuggestUsers(_suggest, _limit));
// });

router.get('/', checkToken, function (req, res, next) {
    wrapper(res, getUsers, undefined, next);
});

router.delete('/:id', checkToken, function (req, res, next) {
    const { id } = req.params;
    debug('deleteUser' + ' ' + id);
    wrapper(res, () => deleteUser(id), { id }, undefined, next);
});

module.exports = router;