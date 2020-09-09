
const { v4: uuidv4 } = require('uuid');
const Joi = require('@hapi/joi');
const { getGroupById, 
    createGroup, 
    updateGroup, 
    deleteGroup, 
    getGroups } = require('./../services/groups');
const db = require('./../data-access/db');
const express = require('express');
const router = express.Router();
const { debug } = require('./../logger');
const winston = require('winston');

const schema = Joi.object({
    id: Joi.string()
        .required(),

    name: Joi.string()
        .alphanum()
        .required(),

    permissions: Joi.array(),
});

router.get('/', function (req, res) {
    debug('getGroups');
    getGroups()
        .then(group => res.send(group))
        .catch(err => {
            winston.error('method: getGroups', 'message: ' + err.message);
            res.status(404).send();
        });
});

router.get('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        debug('getGroupById' + ' ' + _id);
        getGroupById(_id)
            .then(group => res.send(group))
            .catch(err => {
                winston.error('method: getGroupById', 'arguments: ' + _id, 'message: ' + err.message);
                res.status(404).send();
            }) 
    } catch {
        res.status(500).send();
    }
});

router.post('/', function (req, res) {
    try {
        const groupData = req.body;
        const id = uuidv4();
        const group = { ...groupData, id }
        const validationResult = schema.validate(group);
        if (validationResult.error) {
            res.status(400).send({ error: validationResult.error.details });
        } else {
            debug('createGroup' + ' ' + JSON.stringify(group));
            createGroup({ ...group })
                .then(group => res.send(group))
                .catch(err => {
                    winston.error('method: createGroup', 'arguments: ' + JSON.stringify(group), 'message: ' + err.message);
                });
        }
    } catch {
        res.status(500).send();
    }
});

router.patch('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        const groupData = req.body;
        debug('updateGroup' + ' ' + _id + ' ' + JSON.stringify(groupData));
        updateGroup(_id, groupData)
            .then(group => res.send(group))
            .catch(err => {
                winston.error('method: updateGroup', 
                'arguments: ' + JSON.stringify({_id, ...groupData}),
                'message: ' + err.message);
                res.status(404).send();
            });
    } catch {
        res.status(500).send();
    }
});

router.delete('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        debug('deleteGroup' + ' ' + _id);
        deleteGroup(_id)
            .then(group => res.send({ id: _id }))
            .catch(err => {
                winston.error('method: deleteGroup', 'arguments: ' + _id, 'message: ' + err.message);
            });
    } catch {
        res.status(500).send();
    }
});

module.exports = router;