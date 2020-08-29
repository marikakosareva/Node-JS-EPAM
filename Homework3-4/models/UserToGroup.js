const { Sequelize } = require('sequelize');
const db = require('../data-access/db');

const UserToGroup = db.define('usergroup', {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    group_id : {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = UserToGroup;