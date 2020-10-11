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
const { validateGroup } = require('../validation/groups');
const wrapper = require('../common/wrapper');
const router = express.Router();

router.get('/', checkToken, function (req, res) {
    debug('getGroups');
    wrapper(res, getGroups);
});

router.get('/:id', checkToken, function (req, res) {
    const { id } = req.params;
    debug('getGroupById' + ' ' + id);
    wrapper(res, () => getGroupById(id));
});

router.post('/', checkToken, function (req, res) {
    const groupData = req.body;
    const id = uuidv4();
    const group = { ...groupData, id };
    //вынести + 
    validateGroup(group, "create");
    debug('createGroup' + ' ' + JSON.stringify(group));
    wrapper (res, () => createGroup({ ...group }));
});

router.patch('/:id', checkToken, function (req, res) {
    const { id } = req.params;
    const groupData = req.body;
    //валидация +
    validateGroup(groupData, "update");
    debug('updateGroup' + ' ' + id + ' ' + JSON.stringify(groupData));
    wrapper(res, () => updateGroup(id, groupData));
});

router.delete('/:id', checkToken, function (req, res) {
    //_id почему?
    const { id } = req.params;
    debug('deleteGroup' + ' ' + id);
    wrapper(res, () => deleteGroup(id), {id});
});

module.exports = router;