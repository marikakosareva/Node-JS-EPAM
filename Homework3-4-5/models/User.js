const { Sequelize } = require('sequelize');
const db = require('../data-access/db');

const User = db.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    login : {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    is_deleted: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = User;
