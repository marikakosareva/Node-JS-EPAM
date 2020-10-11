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
            const parmissions = this.getDataValue('permissions');
            if (parmissions) return JSON.parse(parmissions);
            return [];
        }, 
        set: function(val) {
            console.log('set');
            return this.setDataValue('permissions', JSON.stringify(val));
        }
    }
})

module.exports = Group;