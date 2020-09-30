const { v4: uuidv4 } = require('uuid');
const express = require('express');
const winston = require('winston');
const createError = require('http-errors');
const checkToken = require('../common/checkToken');
const { getGroupById, 
    createGroup, 
    updateGroup, 
    deleteGroup, 
    getGroups } = require('./../services/groups');
const db = require('./../data-access/db');
const { debug } = require('./../logger');
const schema = require('../validation/groups');
const wrapper = require('../common/wrapper');
const router = express.Router();

router.get('/', checkToken, function (req, res) {
    debug('getGroups');
    wrapper(res, getGroups);
});

router.get('/:id', checkToken, function (req, res) {
    const _id = req.params.id;
    debug('getGroupById' + ' ' + _id);
    wrapper(res, () => getGroupById(_id));
});

router.post('/', checkToken, function (req, res) {
    const groupData = req.body;
    const id = uuidv4();
    const group = { ...groupData, id }
    const validationResult = schema.validate(group);
    if (validationResult.error) {
        throw createError(400, 'Validation Error!');
    } else {
        debug('createGroup' + ' ' + JSON.stringify(group));
        wrapper (res, () => createGroup({ ...group }));
    }
});

router.patch('/:id', checkToken, function (req, res) {
    const _id = req.params.id;
    const groupData = req.body;
    debug('updateGroup' + ' ' + _id + ' ' + JSON.stringify(groupData));
    wrapper(res, () => updateGroup(_id, groupData));
});

router.delete('/:id', checkToken, function (req, res) {
    const _id = req.params.id;
    debug('deleteGroup' + ' ' + _id);
    wrapper(res, () => deleteGroup(_id), {_id});
});

module.exports = router;