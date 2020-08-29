const { v4: uuidv4 } = require('uuid');
const Joi = require('@hapi/joi');
const { getGroupById, createGroup, updateGroup, deleteGroup, getGroups } = require('./../services/groups');
const db = require('./../data-access/db');
const express = require('express');
const router = express.Router();


const schema = Joi.object({
    id: Joi.string()
        .required(),

    name: Joi.string()
        .alphanum()
        .required(),

    permissions: Joi.array(),
});

router.get('/', function (req, res) {
    getGroups()
        .then(group => res.send(group))
        .catch(err => {
            console.log(err);
            res.status(404).send();
        });
});

router.get('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        getGroupById(_id)
            .then(group => res.send(group))
            .catch(err => {
                console.log(err);
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
            createGroup({ ...group })
                .then(group => res.send(group))
                .catch(err => console.log(err));
        }
    } catch {
        res.status(500).send();
    }
});

router.patch('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        const groupData = req.body;
        updateGroup(_id, groupData)
            .then(group => res.send(group))
            .catch(err => {
                console.log(err);
                res.status(404).send();
            });
    } catch {
        res.status(500).send();
    }
});

router.delete('/:id', function (req, res) {
    try {
        const _id = req.params.id;
        deleteGroup(_id)
            .then(group => res.send({ id: _id }))
            .catch(err => console.log(err));
    } catch {
        res.status(500).send();
    }
});

module.exports = router;