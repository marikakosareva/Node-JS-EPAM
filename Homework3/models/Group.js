const { Sequelize } = require('sequelize');
const db = require('../data-access/db');

const Group = db.define('group', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissions: {
        type: Sequelize.STRING,
        get: function() {
            return JSON.parse(this.getDataValue('permissions'));
        }, 
        set: function(val) {
            return this.setDataValue('permissions', JSON.stringify(val));
        }
    }
})

module.exports = Group;
